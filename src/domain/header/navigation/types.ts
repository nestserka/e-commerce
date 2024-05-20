export interface NavLinkProps {
  title: string;
  route: string;
}

export interface NavigationProps {
  links: NavLinkProps[];
  isStatus: boolean;
  isNavOpen: boolean;

  onClick: () => void;
  handleClickLogOut: () => void;
}
