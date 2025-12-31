import { render } from '@testing-library/react';
import Codespace from '../components/Codespace';
import React from 'react';
const mockSocket = {
  emit: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
};

describe('Codespace', () => {
  test('renders editor without crashing', () => {
    render(
      <Codespace
        language="javascript"
        socketRef={{ current: mockSocket }}
        roomId="room123"
        theme="dark"
      />
    );
  });

  test('emits code-change event', () => {
    render(
      <Codespace
        language="javascript"
        socketRef={{ current: mockSocket }}
        roomId="room123"
        theme="dark"
      />
    );

    mockSocket.emit('code-change', {
      roomId: 'room123',
      code: 'console.log("Hello")',
    });

    expect(mockSocket.emit).toHaveBeenCalled();
  });
});
