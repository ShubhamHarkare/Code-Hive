import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CopyButton from '../components/CopyButton';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn()
  }
});

describe('Copy Room ID Feature', () => {
  test('renders copy button', () => {
    render(<CopyButton roomId="test-123" />);
    const copyButton = screen.getByRole('button', { name: /copy/i });
    expect(copyButton).toBeInTheDocument();
  });

  test('copies room ID to clipboard on click', async () => {
    render(<CopyButton roomId="test-123" />);
    const copyButton = screen.getByRole('button', { name: /copy/i });

    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test-123');
  });

  test('shows copied confirmation', async () => {
    render(<CopyButton roomId="test-123" />);
    const copyButton = screen.getByRole('button', { name: /copy/i });

    fireEvent.click(copyButton);

    // Button text should change temporarily
    expect(copyButton.textContent).toContain('Copied');
  });
});
