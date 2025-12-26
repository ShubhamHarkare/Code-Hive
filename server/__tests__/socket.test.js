const io = require('socket.io-client');
const http = require('http');
const ioServer = require('socket.io');

describe('Socket.IO Server Tests', () => {
  let httpServer;
  let ioServerInstance;
  let clientSocket;
  let serverPort;

  beforeAll((done) => {
    httpServer = http.createServer();
    ioServerInstance = ioServer(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });
    httpServer.listen(() => {
      serverPort = httpServer.address().port;
      done();
    });
  });

  afterAll(() => {
    ioServerInstance.close();
    httpServer.close();
  });

  beforeEach((done) => {
    clientSocket = io(`http://localhost:${serverPort}`);
    clientSocket.on('connect', done);
  });

  afterEach(() => {
    if (clientSocket.connected) {
      clientSocket.disconnect();
    }
  });

  test('client connects to server', (done) => {
    expect(clientSocket.connected).toBe(true);
    done();
  });

  test('client can join a room', (done) => {
    const roomId = 'test-room-123';

    ioServerInstance.on('connection', (socket) => {
      socket.on('join-room', (data) => {
        expect(data.roomId).toBe(roomId);
        done();
      });
    });

    clientSocket.emit('join-room', { roomId, username: 'TestUser' });
  });

  test('server broadcasts code changes to room', (done) => {
    const roomId = 'test-room-456';
    const testCode = 'print("Hello, World!")';

    ioServerInstance.on('connection', (socket) => {
      socket.join(roomId);

      socket.on('code-change', (data) => {
        // Broadcast to all clients in room
        socket.to(roomId).emit('code-update', data);
      });
    });

    // Second client to receive broadcast
    const clientSocket2 = io(`http://localhost:${serverPort}`);

    clientSocket2.on('connect', () => {
      clientSocket2.emit('join-room', { roomId, username: 'User2' });

      clientSocket2.on('code-update', (data) => {
        expect(data.code).toBe(testCode);
        clientSocket2.disconnect();
        done();
      });

      // First client sends code change
      clientSocket.emit('code-change', { roomId, code: testCode });
    });
  });
});
