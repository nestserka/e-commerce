import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DYNAMIC_ROUTES } from '../../../constants/constants';
import HomeCategory from '../../../components/home/homeCategory/HomeCategory';

describe('HomeCategory component', () => {
  it('renders HomeCategory component', () => {
    render(<HomeCategory />);

    const exploreButtons = screen.getAllByRole('link', { name: /explore now/i });
    expect(exploreButtons.length).toBe(3);
    expect(exploreButtons[0]).toHaveAttribute('href', `${DYNAMIC_ROUTES.CATALOG}meteorite`);
    expect(exploreButtons[1]).toHaveAttribute('href', `${DYNAMIC_ROUTES.CATALOG}space-suits`);
    expect(exploreButtons[2]).toHaveAttribute('href', `${DYNAMIC_ROUTES.CATALOG}space-food`);

    const meteoriteImages = screen.getAllByAltText(/meteoryte|small meteoryte|product preview/i);
    meteoriteImages.forEach((image) => {
      expect(image).toBeInTheDocument();
    });
  });
});
