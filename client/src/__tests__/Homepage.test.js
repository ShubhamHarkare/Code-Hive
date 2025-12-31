import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../components/HomePage';
import toast from 'react-hot-toast';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

jest.mock('uuid');
jest.mock('react-hot-toast');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('HomePage Component', () => {
  let mockNavigate;

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders inputs and buttons', () => {
    render(<HomePage />);
    expect(screen.getByPlaceholderText(/Enter roomId/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeInTheDocument();
    expect(screen.getByText(/JOIN/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Room/i)).toBeInTheDocument();
  });

  test('shows error toast if JOIN is clicked with empty fields', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText(/JOIN/i));
    expect(toast.error).toHaveBeenCalledWith('Both the fields are required');
  });

  test('navigates to editor when JOIN is clicked with valid fields', () => {
    render(<HomePage />);
    fireEvent.change(screen.getByPlaceholderText(/Enter roomId/i), {
      target: { value: 'test-room' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter username/i), {
      target: { value: 'testUser' },
    });

    fireEvent.click(screen.getByText(/JOIN/i));

    expect(mockNavigate).toHaveBeenCalledWith('/editor/test-room', {
      state: { username: 'testUser' },
    });
    expect(toast.success).toHaveBeenCalledWith('Room is created');
  });
});
