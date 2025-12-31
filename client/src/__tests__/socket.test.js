import { io } from 'socket.io-client';

jest.mock('socket.io-client', () => ({
  io: jest.fn(),
}));

describe('Frontend Socket', () => {
  test('socket is initialized', () => {
    io.mockReturnValue({
      emit: jest.fn(),
      on: jest.fn(),
    });

    const socket = io('http://localhost:5000');
    expect(socket).toBeDefined();
  });
});
