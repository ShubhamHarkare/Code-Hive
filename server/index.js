const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const userSocketMap = {};
const socketRoomMap = {}; // ADD THIS - track which room each socket is in
const roomCodeMap = {} ; //Description: Map to store roomId -> Code
const roomLanguageMap = {} //DESC: Map to store roomid and language
const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId]
    };
  });
};
//Description: SocketIO for connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on("join", ({ roomId, username }) => {
  userSocketMap[socket.id] = username;
  socketRoomMap[socket.id] = roomId;
  socket.join(roomId);

  if(!roomCodeMap[roomId]){
    roomCodeMap[roomId] = "# Write your Python code here";
  }
  if(!roomLanguageMap[roomId]){
    roomLanguageMap[roomId] = "python";
  }

  const clients = getAllConnectedClients(roomId);
  console.log('Clients in room:', clients); // CHECK YOUR SERVER CONSOLE
  
  // This emits to the entire room
  io.to(roomId).emit("joined", {
    clients,
    username,
    socketId: socket.id
  });

  socket.emit('init-code', roomCodeMap[roomId]);
  socket.emit('init-language',roomLanguageMap[roomId]);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    const roomId = socketRoomMap[socket.id]; // GET THE ROOM
    const username = userSocketMap[socket.id];
    
    console.log(`User ${username} left room: ${roomId}`);
    
    if (roomId) {
      // Notify others in the room
      socket.to(roomId).emit("disconnected", {
        socketId: socket.id,
        username: username
      });
      
      delete socketRoomMap[socket.id]; // CLEAN UP
    }
    
    delete userSocketMap[socket.id];
  });

  //Description: Connection for code change
  socket.on("code-change", ({ roomId, code }) => {
  roomCodeMap[roomId] = code;
  socket.to(roomId).emit("code-change", code);
  });

  //Description: Connection for language change
  socket.on('language-change',({ roomId, language}) => {
    roomLanguageMap[roomId] = language;
    socket.to(roomId).emit('language-change',language);
  })

  //Description: Code for leaving the room
  socket.on("leave-room",() => {
    const roomId = socketRoomMap[socket.id]
    const username = userSocketMap[socket.id]

    if (!roomId) return;

    socket.to(roomId).emit('user-left',{
      socketId:socket.id,
      username
    })
    socket.leave(roomId)
    delete socketRoomMap[socket.id];
    delete userSocketMap[socket.id];

  

  console.log(`User ${username} left room: ${roomId}`);
  });

})
const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});