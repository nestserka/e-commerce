import { type ReactNode } from 'react';

import { type NavLink } from '../navigation/types.tsx';

export interface HeaderProps {
  links: NavLink[];
  children?: ReactNode;
}
