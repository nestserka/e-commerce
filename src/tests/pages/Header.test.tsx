import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import Header from '../../domain/header/Header';

describe('Header component', () => {
  it('renders logo and navigation', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(screen.getByAltText('NASA Store logotype')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
