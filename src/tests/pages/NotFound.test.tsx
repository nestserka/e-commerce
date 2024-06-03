import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ROUTES } from '../../constants/constants';
import NotFoundPage from '../../pages/notFoundPage/NotFoundPage';

describe('NotFoundPage', () => {
  it('renders the correct elements and text content', () => {
    const { getByTestId, getByText, getByAltText } = render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
    const mainElement = getByTestId('not-found-page');
    expect(mainElement).toBeInTheDocument();

    const iconElement = getByAltText('');
    expect(iconElement).toBeInTheDocument();

    const titleElement = getByText(/oops.../i);
    expect(titleElement).toBeInTheDocument();

    const paragraphElement = getByText(/cosmic 404 black hole/i);
    expect(paragraphElement).toBeInTheDocument();

    const goHomeButton = getByText(/go home/i);
    expect(goHomeButton).toBeInTheDocument();
    expect(goHomeButton.closest('a')).toHaveAttribute('href', ROUTES.HOME);
  });
});
