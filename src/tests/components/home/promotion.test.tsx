import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomePromotion from '../../../components/home/promotion/Promotion';

describe('HomePromotion component', () => {
  it('should render promotion sections correctly', () => {
    const { getByText, getByAltText } = render(<HomePromotion />);
    expect(getByText('The super eye for the night sky!')).toBeInTheDocument();
    expect(
      getByText('Feel the cosmic sweetness! Buy 3 strawberry desserts for the price of 2!'),
    ).toBeInTheDocument();
    expect(getByText('Use our promo code VENUS_DEALS on purchases over $3000 and get 20% off!')).toBeInTheDocument();
    expect(getByAltText('EyewearImage')).toBeInTheDocument();
    expect(getByAltText('SpaceFood')).toBeInTheDocument();
  });
});
