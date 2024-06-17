import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import EmptyCartState from '../../domain/cart/emptyCartView/emptyCartState';
import { ROUTES } from '../../constants/constants';

describe('EmptyCartState component', () => {
  it('renders EmptyCartState component', () => {
    render(
      <BrowserRouter>
        <EmptyCartState />
      </BrowserRouter>,
    );

    const exploreCatalogButton = screen.getByRole('link', { name: /explore catalog/i });
    expect(exploreCatalogButton).toBeInTheDocument();
    expect(exploreCatalogButton).toHaveAttribute('href', ROUTES.CATALOG_ALL);
  });
});
