import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomePromotion from '../../../components/home/promotion/Promotion';

describe('HomePromotion component', () => {
  it('should render promotion sections correctly', () => {
    const { getByText, getByAltText } = render(<HomePromotion />);
    expect(getByText('The super eye for the night sky!')).toBeInTheDocument();
    expect(getByText('15% discount on stunning space image canvas prints!')).toBeInTheDocument();
    expect(getByText('Unlock 20% off astronaut space food only today!')).toBeInTheDocument();
    expect(getByAltText('EyewearImage')).toBeInTheDocument();
    expect(getByAltText('poster')).toBeInTheDocument();
    expect(getByAltText('SpaceFood')).toBeInTheDocument();
  });
});
