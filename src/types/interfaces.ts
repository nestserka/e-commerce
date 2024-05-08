import { type ReactNode } from 'react';

export interface HeaderProps {
  links: NavLink[];
  children?: ReactNode;
}

export interface NavLink {
  linkTitle: string;
  route: string;
}
