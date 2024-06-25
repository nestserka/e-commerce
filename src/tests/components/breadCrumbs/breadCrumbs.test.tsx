import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import Breadcrumbs from '../../../components/breadCrumbs/breadCrumbs';

describe('Breadcrumbs component', () => {
  const mockLinks = [
    { label: 'Category', route: '/category' },
    { label: 'Subcategory', route: '/category/subcategory' },
    { label: 'Product', route: '/category/subcategory/product' },
  ];

  it('should render breadcrumbs with correct links', () => {
    const { getByAltText, getByText } = render(
      <Router>
        <Breadcrumbs links={mockLinks} />
      </Router>,
    );

    const homeIcon = getByAltText('NASA Store Homepage');
    expect(homeIcon).toBeInTheDocument();
    mockLinks.forEach((link) => {
      const linkElement = getByText(link.label);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link.route);
    });
  });

  it('should render correct number of chevron icons', () => {
    const { getAllByAltText } = render(
      <Router>
        <Breadcrumbs links={mockLinks} />
      </Router>,
    );
    const chevronIcons = getAllByAltText('');
    expect(chevronIcons.length).toBe(mockLinks.length);
  });
});
