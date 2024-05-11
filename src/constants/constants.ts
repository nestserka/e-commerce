import { z } from 'zod';

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

export const PASSWORD_VALIDATION_SCHEMA = z
  .string()
  .min(8)
  .refine((value) => /^[a-zA-Z0-9\s!@#$%^&*]*$/.test(value), {
    message: 'Password must contain only Latin characters, numbers and special characters (e.g., !@#$%^&*).',
  })
  .refine((value) => /[A-Z]/.test(value), {
    message: 'Password must contain at least one uppercase letter (A-Z).',
  })
  .refine((value) => /[a-z]/.test(value), {
    message: 'Password must contain at least one lowercase letter (a-z).',
  })
  .refine((value) => /\d/.test(value), {
    message: 'Password must contain at least one digit (0-9).',
  })
  .refine((value) => /[!@#$%&*]/.test(value), {
    message: 'Password must contain at least one special character (e.g., !@#$%^&*).',
  })
  .refine((value) => !/\s/.test(value), {
    message: 'Password must not contain whitespace.',
  });

export const EMAIL_VALIDATION_SCHEMA = z
  .string()
  .refine(
    (value) => {
      if (value.includes('@')) {
        const arr = value.split('@');

        if (arr[0].length || arr[1].includes('.')) {
          return true;
        }
      }

      return false;
    },
    {
      message: "Email address must contain an '@' symbol separating local part and domain name.",
    },
  )
  .refine((value) => !/\s/.test(value), {
    message: 'Email address must not contain whitespace.',
  })
  .refine(
    (value) => {
      const parts = value.split('@');

      if (parts.length > 2) {
        return false;
      }

      if (!/^[a-zA-Z0-9.]*$/.test(parts[0]) || !/^[a-zA-Z.]*$/.test(parts[1])) {
        return false;
      }

      return true;
    },
    {
      message: 'Email address must be properly formatted (e.g., user@example.com).',
    },
  )
  .refine(
    (value) => {
      if (value.includes('@')) {
        const parts = value.split('@');

        if (!parts[1].length || !parts[1].includes('.')) {
          return false;
        }

        const domainParts = parts[1].split('.');

        if (domainParts.length !== 2) {
          return false;
        }
      }

      return true;
    },
    {
      message: 'Email address must contain a domain name (e.g., example.com).',
    },
  );
