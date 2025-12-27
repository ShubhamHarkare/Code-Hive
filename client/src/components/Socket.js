import { io } from 'socket.io-client';

const initSocket = async () => {
  return new Promise((resolve, reject) => {
    const options = {
      'force new connection': true,
      reconnectionAttempts: Infinity,
      timeout: 10000,
      transports: ['websocket']
    };

    const socket = io(
      process.env.REACT_APP_BACKEND_URL || 'http://localhost:5555',
      options
    );

    socket.on('connect', () => {
      console.log('✅ Socket connected in initSocket!');
      resolve(socket);
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error);
      reject(error);
    });
  });
};

export default initSocket;