import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import HomePage from '../../pages/homePage/HomePage';

describe('HomePage component', () => {
  it('renders HomePage with default greeting for unauthenticated user', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const subtitleElement = screen.getByText(/Feel free to explore our digital hub./i);
    expect(subtitleElement).toBeInTheDocument();

    const rocketIconElement = screen.getByAltText('Rocket');
    expect(rocketIconElement).toBeInTheDocument();
  });
});
