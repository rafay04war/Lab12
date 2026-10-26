import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ info: 'React is communicating with Node.js' }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('displays the message fetched from the backend', async () => {
  render(<App />);

  const message = await screen.findByText(/React is communicating with Node.js/i);
  expect(message).toBeInTheDocument();
});
