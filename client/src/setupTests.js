import '@testing-library/jest-dom';
jest.mock('@uiw/react-codemirror');
jest.mock('@codemirror/lang-python');
jest.mock('@codemirror/lang-javascript');
jest.mock('@codemirror/lang-cpp');
jest.mock('@codemirror/theme-one-dark');
jest.mock('@uiw/codemirror-theme-github');


// Mock Socket.IO client
jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const off = jest.fn();
  const connect = jest.fn();
  const disconnect = jest.fn();

  return jest.fn(() => ({
    emit,
    on,
    off,
    connect,
    disconnect,
    connected: true
  }));
});
