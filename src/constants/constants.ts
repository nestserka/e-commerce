import type { NavLinkProps } from '../components/navigation/types';

export const ROUTES = {
  START: '/',
  MAIN: '/home',
  PRODUCT_BESTSELLER: 'main/:productId',
  LOGIN: '/signin',
  REGISTRATION: '/signup',
  ABOUT_US: '/about',
  CATALOG: '/catalog',
  CATEGORY: '/catalog/:category',
  PRODUCT: '/catalog/:category/:productId',
  PROFILE: '/profile/:customerId',
  CART: '/cart',
  CART_CUSTOMER: '/cart/:customerId',
  NOT_FOUND: '*',
} as const;

export const NAVLINKS: NavLinkProps[] = [
  { title: 'Home', route: ROUTES.MAIN },
  { title: 'Sign In', route: ROUTES.LOGIN },
  { title: 'Sign Up', route: ROUTES.REGISTRATION },
  { title: 'Catalog', route: ROUTES.CATALOG },
  { title: 'About', route: ROUTES.ABOUT_US },
];
