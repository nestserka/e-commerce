import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';

import App from '../app/App.tsx';

describe('App', () => {
  it('renders without errors', () => {
    render(<App />);

    const containerElement = screen.getByTestId('app');
    expect(containerElement).toBeInTheDocument();
  });
});
