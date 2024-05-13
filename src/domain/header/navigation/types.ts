export interface NavLinkProps {
  title: string;
  route: string;
}

export interface NavigationProps {
  links: NavLinkProps[];
  isStatus: boolean;
  handleClickLogOut: () => void;
}
