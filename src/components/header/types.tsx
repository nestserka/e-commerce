import { type ReactNode } from 'react';

import { type NavigationLink } from '../navigation/types.tsx';

export interface HeaderProps {
  links: NavigationLink[];
  children?: ReactNode;
}
