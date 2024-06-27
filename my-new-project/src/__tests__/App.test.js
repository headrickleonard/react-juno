
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

test('renders Home component', () => {
  render(<Home />);
  expect(screen.getByText('Home Page')).toBeInTheDocument();
});
