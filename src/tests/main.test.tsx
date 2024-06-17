import React from 'react';
import { describe, expect, it } from 'vitest';

import App from '../app/App';

describe('Root element', () => {
  it('renders App component into the root element', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    <React.StrictMode>
      <App />
    </React.StrictMode>;

    const appElement = document.getElementById('root');
    expect(appElement).toBeInTheDocument();

    document.body.removeChild(root);
  });
});
