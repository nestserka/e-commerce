import { type ReactNode } from 'react';

import { type NavLinkProps } from '../navigation/types';

export interface HeaderProps {
  links: NavLinkProps[];
  children?: ReactNode;
}
