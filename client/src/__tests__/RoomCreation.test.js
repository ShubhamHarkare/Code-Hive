import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

describe('Room Creation', () => {
  test('renders create room button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const createButton = screen.getByText(/create new room/i);
    expect(createButton).toBeInTheDocument();
  });

  test('generates unique room ID on create', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const createButton = screen.getByText(/create new room/i);
    fireEvent.click(createButton);

    await waitFor(() => {
      // Check if room ID input has a value
      const roomInput = screen.getByPlaceholderText(/room id/i);
      expect(roomInput.value).not.toBe('');
      expect(roomInput.value.length).toBeGreaterThan(0);
    });
  });

  test('allows joining with existing room ID', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const roomInput = screen.getByPlaceholderText(/room id/i);
    const joinButton = screen.getByText(/join room/i);

    fireEvent.change(roomInput, { target: { value: 'test-room-123' } });
    expect(roomInput.value).toBe('test-room-123');
    expect(joinButton).not.toBeDisabled();
  });

  test('join button disabled with empty room ID', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const joinButton = screen.getByText(/join room/i);
    expect(joinButton).toBeDisabled();
  });
});
