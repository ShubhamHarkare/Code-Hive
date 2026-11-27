// Code Hive sync-latency test (adapted to the deployed server, v1.0.0).
// Measures how long an edit sent by one client takes to reach the others in the same room.
//
//   node codehive_latency_test.js                 (10 clients, 50 edits, deployed server)
//   node codehive_latency_test.js 25 100          (25 clients, 100 edits)
//   URL=http://localhost:5555 node codehive_latency_test.js 50 100
//
// Server contract (server/index.js at HEAD):
//   client -> 'join'        { roomId, username }          server replies 'joined' to the room
//   client -> 'code-change' { roomId, code }              server -> others: 'code-change', code (a bare string)
// Because only the string is forwarded, the timestamp is embedded in the code text.
//
// Do not point this at code execution (Piston). It only tests the sync path.

const { io } = require("socket.io-client");
const crypto = require("crypto");

const URL = process.env.URL || "https://code-hive-05q7.onrender.com";
const NUM_CLIENTS = parseInt(process.argv[2] || "10", 10);
const NUM_MESSAGES = parseInt(process.argv[3] || "50", 10);
const GAP_MS = parseInt(process.env.GAP_MS || "100", 10); // pause between edits from the sender
const WARMUP = 5; // first edits are discarded

const room = "loadtest-" + crypto.randomUUID();
const latencies = [];
let connectFailures = 0;
let joinFailures = 0;

const encode = (n, ts) => `#LT n=${n} ts=${ts}\n` + "x".repeat(200);
const decode = (code) => {
  const m = typeof code === "string" && code.match(/^#LT n=(\d+) ts=(\d+)/);
  return m ? { n: +m[1], ts: +m[2] } : null;
};

function pct(sorted, p) {
  if (!sorted.length) return NaN;
  const idx = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1);
  return sorted[idx];
}

function connect(i) {
  return new Promise((resolve) => {
    const s = io(URL, { transports: ["websocket"], reconnection: false, timeout: 60000 });
    s.on("connect", () => {
      // Wait until the server confirms our own join, so we are in the room before edits start.
      const t = setTimeout(() => { joinFailures++; resolve(null); s.close(); }, 30000);
      s.on("joined", ({ socketId }) => {
        if (socketId === s.id) { clearTimeout(t); resolve(s); }
      });
      s.emit("join", { roomId: room, username: "load-" + i });
    });
    s.on("connect_error", (e) => {
      connectFailures++;
      if (connectFailures <= 3) console.error("connect_error:", e.message);
      resolve(null);
    });
  });
}

(async () => {
  console.log(`Warming up ${URL} (Render cold start can take 30-60 s)...`);
  try { await fetch(URL + "/api/health", { signal: AbortSignal.timeout(90000) }); } catch {}

  console.log(`Connecting ${NUM_CLIENTS} clients (room ${room})`);
  const t0 = Date.now();
  // Connect in small batches so we test steady-state sync, not a thundering herd.
  const sockets = [];
  for (let i = 0; i < NUM_CLIENTS; i += 20) {
    const batch = await Promise.all(
      Array.from({ length: Math.min(20, NUM_CLIENTS - i) }, (_, k) => connect(i + k))
    );
    sockets.push(...batch.filter(Boolean));
  }
  console.log(`Connected ${sockets.length}/${NUM_CLIENTS} in ${Date.now() - t0} ms`);
  if (sockets.length < 2) {
    console.error("Need at least 2 connected clients.");
    process.exit(1);
  }
  const sender = sockets[0];
  const receivers = sockets.slice(1);

  receivers.forEach((r) => {
    r.on("code-change", (code) => {
      const d = decode(code);
      if (!d || d.n < WARMUP) return;
      latencies.push(Date.now() - d.ts); // same machine, same clock
    });
  });

  const total = NUM_MESSAGES + WARMUP;
  for (let n = 0; n < total; n++) {
    sender.emit("code-change", { roomId: room, code: encode(n, Date.now()) });
    await new Promise((r) => setTimeout(r, GAP_MS));
  }

  await new Promise((r) => setTimeout(r, 3000)); // stragglers

  const expected = NUM_MESSAGES * receivers.length;
  const sorted = latencies.slice().sort((a, b) => a - b);
  const mean = sorted.reduce((a, b) => a + b, 0) / (sorted.length || 1);

  console.log("\n--- Results ---");
  console.log("clients connected:", sockets.length, `(connect failed: ${connectFailures}, join timeout: ${joinFailures})`);
  console.log("edits sent (after warmup):", NUM_MESSAGES, "| receivers:", receivers.length);
  console.log("deliveries expected:", expected, "| measured:", sorted.length,
    "| delivery rate:", ((sorted.length / expected) * 100).toFixed(1) + "%");
  console.log("latency ms  p50:", pct(sorted, 50), " p95:", pct(sorted, 95),
    " p99:", pct(sorted, 99), " max:", sorted[sorted.length - 1], " mean:", mean.toFixed(1));

  if (process.env.JSON_OUT) {
    require("fs").appendFileSync(process.env.JSON_OUT, JSON.stringify({
      clients: NUM_CLIENTS, connected: sockets.length, expected, measured: sorted.length,
      p50: pct(sorted, 50), p95: pct(sorted, 95), p99: pct(sorted, 99), max: sorted[sorted.length - 1],
      mean: +mean.toFixed(1),
    }) + "\n");
  }

  sockets.forEach((s) => s.close());
  process.exit(0);
})();
