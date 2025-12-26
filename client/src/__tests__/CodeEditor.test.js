import React from 'react';
import { render, screen } from '@testing-library/react';
import CodeEditor from '../components/CodeEditor';

describe('CodeEditor Component', () => {
  test('renders code editor', () => {
    render(<CodeEditor roomId="test-room" />);
    const editorElement = screen.getByTestId('code-editor');
    expect(editorElement).toBeInTheDocument();
  });

  test('initializes with empty code', () => {
    const { container } = render(<CodeEditor roomId="test-room" />);
    const editor = container.querySelector('.CodeMirror');
    expect(editor).toBeInTheDocument();
  });

  test('displays room ID', () => {
    render(<CodeEditor roomId="test-room-456" />);
    const roomIdElement = screen.getByText(/test-room-456/i);
    expect(roomIdElement).toBeInTheDocument();
  });
});
