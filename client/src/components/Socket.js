import { io } from 'socket.io-client';

const initSocket = () => {
  const option = {
    'force new connection': true,
    reconnectionAttempt: Infinity,
    timeout: 100000,
    transports: ['websocket']
  };
  return io(
    process.env.REACT_APP_BACKEND_URL || 'http://localhost:5555',
    option
  );
};

export default initSocket;
