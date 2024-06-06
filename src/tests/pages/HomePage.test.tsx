import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import HomePage from '../../pages/homePage/HomePage';

describe('HomePage', () => {
  it('renders the homepage with correct elements', () => {
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );
    const homeElement = getByTestId('home');
    expect(homeElement).toBeInTheDocument();

    const titleElement = getByText(/hello, stranger!/i);
    expect(titleElement).toBeInTheDocument();

    expect(homeElement.querySelector('.modal-message')).toBeNull();

    expect(getByText(/sign up/i)).toBeInTheDocument();
    expect(getByText(/sign in/i)).toBeInTheDocument();
    expect(getByText(/about us/i)).toBeInTheDocument();
  });
});
