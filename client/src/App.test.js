import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import HomePage from './components/HomePage.jsx';
import Editor from './components/Editor.jsx';

// Mock external dependencies
jest.mock('react-hot-toast', () => ({
  Toaster: () => <div data-testid="toaster" />,
}));
jest.mock('./components/HomePage.jsx', () => () => <div>Home Page Mock</div>);
jest.mock('./components/Editor.jsx', () => () => <div>Editor Mock</div>);

describe('App Component', () => {
  test('renders Toaster', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });

  test('renders home page initially at "/" route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home Page Mock/i)).toBeInTheDocument();
  });

  test('renders editor page at "/editor/:roomId" route', () => {
    render(
      <MemoryRouter initialEntries={['/editor/test-room']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Editor Mock/i)).toBeInTheDocument();
  });
});
