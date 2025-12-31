// Load environment variables first
require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const CORS = require('cors');

// Middleware required
app.use(express.json());

// Get allowed origins from environment variable
const getAllowedOrigins = () => {
  const defaultOrigins = ['http://localhost:3000'];
  
  if (process.env.CORS_ORIGINS) {
    try {
      const envOrigins = process.env.CORS_ORIGINS
        .split(',')
        .map(origin => origin.trim())
        .filter(origin => origin.length > 0);
      return [...defaultOrigins, ...envOrigins];
    } catch (error) {
      console.error('Error parsing CORS_ORIGINS:', error);
      return defaultOrigins;
    }
  }
  
  return defaultOrigins;
};

const allowedOrigins = getAllowedOrigins();
console.log('🔒 Allowed CORS origins:', allowedOrigins);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      console.log('✅ Allowed origin:', origin);
      callback(null, true);
    } else {
      console.log('❌ Blocked origin:', origin);
      console.log('   Expected one of:', allowedOrigins);
      // Still allow the request but log it (change to callback(new Error(...)) to block)
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Content-Length', 'Content-Type']
};

app.use(CORS(corsOptions));




// Add request logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Backend is running',
    allowedOrigins: allowedOrigins
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Code-Hive Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      execute: '/api/execute (POST)',
      languages: '/api/languages (GET)'
    }
  });
});

// Adding code execution routes
const codeExecution = require('./codeExecution.js');
app.use('/api', codeExecution);

// Socket.IO configuration
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const userSocketMap = {};
const socketRoomMap = {}; // Track which room each socket is in
const roomCodeMap = {}; // Map to store roomId -> Code
const roomLanguageMap = {}; // Map to store roomId -> language

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId]
    };
  });
};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);
  
  socket.on('join', ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socketRoomMap[socket.id] = roomId;
    socket.join(roomId);

    // Initialize room data if it doesn't exist
    if (!roomCodeMap[roomId]) {
      roomCodeMap[roomId] = '# Write your Python code here';
    }
    if (!roomLanguageMap[roomId]) {
      roomLanguageMap[roomId] = 'python';
    }

    const clients = getAllConnectedClients(roomId);
    console.log(`👥 Clients in room ${roomId}:`, clients);
    
    // Emit to the entire room
    io.to(roomId).emit('joined', {
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
      socket.to(roomId).emit('disconnected', {
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

  // Code change handler
  socket.on('code-change', ({ roomId, code }) => {
    console.log(`📝 Code change in room ${roomId}`);
    roomCodeMap[roomId] = code; // Persist the code
    socket.to(roomId).emit('code-change', code); // Broadcast to others
  });

  // Language change handler
  socket.on('language-change', ({ roomId, language }) => {
    console.log(`🔤 Language change in room ${roomId}: ${language}`);
    roomLanguageMap[roomId] = language;
    // Send language change to all users in the room including sender
    io.to(roomId).emit('language-change', language);
  });
  
  // Leave room handler
  socket.on('leave-room', () => {
    const roomId = socketRoomMap[socket.id];
    const username = userSocketMap[socket.id];

    if (!roomId) {
      return;
    }

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log('=================================');
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📅 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔒 CORS Origins: ${allowedOrigins.join(', ')}`);
  console.log('=================================');
});