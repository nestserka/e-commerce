import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import ProfilePage from '../../pages/profilePage/ProfilePage';

describe('ProfilePage', () => {
  it('renders loading indicator when customer info is not set', () => {
    const { getByText } = render(<ProfilePage />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
