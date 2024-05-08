import { type NavLink } from '../types/interfaces';

export const ROUTES = {
  START: '/',
  MAIN: '/main',
  PRODUCT_BESTSELLER: 'main/:productId',
  LOGIN: '/login',
  REGISTRATION: '/auth',
  ABOUT_US: '/about',
  CATALOG: '/catalog',
  CATEGORY: '/catalog/:category',
  PRODUCT: '/catalog/:category/:productId',
  PROFILE: '/profile/:customerId',
  CART: '/cart',
  CART_CUSTOMER: '/cart/:customerId',
  NOT_FOUND: '*',
} as const;

export const NAVLINKS: NavLink[] = [
  { linkTitle: 'Home', route: '/home' },
  { linkTitle: 'Sign In', route: '/signin' },
  { linkTitle: 'Sign Up', route: '/signup' },
  { linkTitle: 'Catalog', route: '/catalog' },
  { linkTitle: 'About', route: '/about' },
];
