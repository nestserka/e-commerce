import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProfileAvatar from '../../../domain/customer/avatar/profileAvatar';


describe('ProfileAvatar', () => {
  it('renders profile avatar component',() => {
    render(<ProfileAvatar />);

    const profileAvatarElement = screen.getByTestId('profile-avatar');
    expect(profileAvatarElement).toBeInTheDocument();
    const profileIconElement = screen.getByAltText('');
    expect(profileIconElement).toBeInTheDocument();
  });
});
