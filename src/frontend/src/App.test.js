import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the quiz', () => {
  const { getById } = render(<App />);
  const linkElement = getById(/reactquiz/i);
  expect(linkElement).toBeInTheDocument();
});
