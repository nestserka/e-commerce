export interface NavLinkProps {
  title: string;
  route: string;
}

export interface NavigationProps {
  links: NavLinkProps[];
  isStatus: boolean;
  isNavOpen: boolean;
  customerId: string;

  onClick: () => void;
  handleClickLogOut: () => void;
}
