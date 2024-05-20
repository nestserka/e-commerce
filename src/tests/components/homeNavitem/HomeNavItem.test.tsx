import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import HomeNavItem from '../../../components/homeNavItem/HomeNavItem';
import style from '../../../components/homeNavItem/_homeNavItem.module.scss';

describe('HomeNavItem', () => {
  it('renders the navigation item with title, icon, and link', () => {
    const testTitle = 'Home';
    const testIcon = '/path/to/icon.svg';
    const testRoute = '/home';
    const testLinkLabel = 'Go to Home';
    const testIndex = 2;

    render(
      <BrowserRouter>
        <HomeNavItem title={testTitle} icon={testIcon} route={testRoute} linkLabel={testLinkLabel} index={testIndex} />
      </BrowserRouter>,
    );

    const navItem = screen.getByTestId('nav-item-component');
    const title = screen.getByText(testTitle);
    const link = screen.getByRole('link');
    const iconImage = screen.getByAltText('');

    expect(navItem).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(link).toHaveTextContent(testLinkLabel);
    expect(link).toHaveAttribute('href', testRoute);
    expect(iconImage).toHaveAttribute('src', testIcon);
    expect(iconImage).toHaveClass(style['nav-item-icon']);
  });
});
