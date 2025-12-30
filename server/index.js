const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const server = http.createServer(app);
const CORS = require('cors');


//Middleware required
app.use(express.json())
app.use(CORS({
  origin: "https://your-frontend.vercel.app" || "http://http://localhost:3000",
  methods: ["GET", "POST"]
}));
//Adding code execuiton here
const codeExecution = require('./codeExecution.js');
app.use('/api',codeExecution);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const userSocketMap = {};
const socketRoomMap = {}; // Track which room each socket is in
const roomCodeMap = {}; // Map to store roomId -> Code
const roomLanguageMap = {}; // Map to store roomId -> language
const roomThemeMap = {} // Map for roomId->theme

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId]
    };
  });
};

// Description: SocketIO for connection
io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);
  
  socket.on("join", ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socketRoomMap[socket.id] = roomId;
    socket.join(roomId);

    // Initialize room data if it doesn't exist
    if (!roomCodeMap[roomId]) {
      roomCodeMap[roomId] = "# Write your Python code here";
    }
    if (!roomLanguageMap[roomId]) {
      roomLanguageMap[roomId] = "python";
    }

    const clients = getAllConnectedClients(roomId);
    console.log(`👥 Clients in room ${roomId}:`, clients);
    
    // Emit to the entire room
    io.to(roomId).emit("joined", {
      clients,
      username,
      socketId: socket.id
    });

    // Send current room state to the joining user
    socket.emit('init-code', roomCodeMap[roomId]);
    socket.emit('init-language', roomLanguageMap[roomId]);
    
    console.log(`📤 Sent init-code to ${username}: "${roomCodeMap[roomId].substring(0, 50)}..."`);
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    
    const roomId = socketRoomMap[socket.id];
    const username = userSocketMap[socket.id];
    
    if (roomId) {
      console.log(`👋 User ${username} left room: ${roomId}`);
      
      // Notify others in the room
      socket.to(roomId).emit("disconnected", {
        socketId: socket.id,
        username: username
      });

      // Check if room is empty, if so clean up room data
      const remainingClients = getAllConnectedClients(roomId);
      if (remainingClients.length === 0) {
        console.log(`🧹 Cleaning up empty room: ${roomId}`);
        delete roomCodeMap[roomId];
        delete roomLanguageMap[roomId];
      }
      
      delete socketRoomMap[socket.id];
    }
    
    delete userSocketMap[socket.id];
  });

  // Description: Connection for code change
  socket.on("code-change", ({ roomId, code }) => {
    console.log(`📝 Code change in room ${roomId}`);
    roomCodeMap[roomId] = code; // Persist the code
    socket.to(roomId).emit("code-change", code); // Broadcast to others
  });

  // Description: Connection for language change
  socket.on('language-change', ({ roomId, language }) => {
    console.log(`🔤 Language change in room ${roomId}: ${language}`);
    roomLanguageMap[roomId] = language;
    // Send language change to all users in the room including sender
    io.to(roomId).emit('language-change', language);
    // Note: Code persists in roomCodeMap[roomId], no need to reset it
  });
  
  // Description: Code for leaving the room
  socket.on("leave-room", () => {
    const roomId = socketRoomMap[socket.id];
    const username = userSocketMap[socket.id];

    if (!roomId) return;

    console.log(`👋 User ${username} manually left room: ${roomId}`);

    socket.to(roomId).emit('disconnected', {
      socketId: socket.id,
      username
    });
    
    socket.leave(roomId);
    
    // Check if room is empty after this user leaves
    const remainingClients = getAllConnectedClients(roomId);
    if (remainingClients.length === 0) {
      console.log(`🧹 Cleaning up empty room: ${roomId}`);
      delete roomCodeMap[roomId];
      delete roomLanguageMap[roomId];
    }
    
    delete socketRoomMap[socket.id];
    delete userSocketMap[socket.id];
  });
});

const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});