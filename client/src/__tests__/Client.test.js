import { render, screen } from '@testing-library/react';
import Client from '../components/Client';
import React from 'react';
describe('Client', () => {
  test('renders username correctly', () => {
    render(<Client username="Shubham" />);
    expect(screen.getByText('Shubham')).toBeInTheDocument();
  });
});
