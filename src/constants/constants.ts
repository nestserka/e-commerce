import { z } from 'zod';
import dayjs from 'dayjs';

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
  .min(8, 'Password must be at least 8 characters long.')
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

const nameValidation = (fieldName: string): z.ZodEffects<z.ZodString, string, string> =>
  z
    .string()
    .min(1, `${fieldName} must contain at least one character.`)
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: `${fieldName} must contain only letters (no special characters or numbers).`,
    });

export const FIRST_NAME_VALIDATION_SCHEMA = nameValidation('First name');

export const LAST_NAME_VALIDATION_SCHEMA = nameValidation('Last name');

const MIN_AGE = 13;

const calculateAge = (date: Date): number => {
  const now = dayjs();
  const birthDate = dayjs(date);
  const age = now.diff(birthDate, 'year');

  return age;
};

export const DATE_VALIDATION_SCHEMA = z.coerce
  .date()
  .refine(
    (date) => {
      const today = new Date();

      return date <= today;
    },
    {
      message: 'Birthdate cannot be in the future.',
    },
  )
  .refine((date) => calculateAge(date) >= MIN_AGE, {
    message: `User must be at least ${MIN_AGE} years old.`,
  });

const STREET_VALIDATION_SCHEMA = z
  .string()
  .min(1, `Street must contain at least one character.`)
  .refine((value) => /^[a-zA-Z0-9\s]*$/.test(value), {
    message: `Street must contain only Latin characters, numbers, and spaces.`,
  });

const CITY_VALIDATION_SCHEMA = z
  .string()
  .min(1, `City must contain at least one character.`)
  .refine((value) => /^[a-zA-Z]*$/.test(value), {
    message: `City must contain only Latin characters and no spaces.`,
  });

const validCountries = ['US', 'CA'];

const COUNTRY_VALIDATION_SCHEMA = z.string().refine((value) => validCountries.includes(value), {
  message: 'Country must be a valid country from the predefined list.',
});

const CANADA_POSTCODE_VALIDATION_SCHEMA = z
  .string()
  .refine((value) => /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/.test(value), {
    message: 'Postal code must follow the format for CANADA (e.g., A1B 2C3)',
  });

export const US_POSTCODE_VALIDATION_SCHEMA = z.string().refine((value) => /^\d{5}$/.test(value), {
  message: 'Postal code must follow the format for the USA (e.g., 12345)',
});

export const ADDRESS_VALIDATION_SCHEMA = z
  .object({
    street: STREET_VALIDATION_SCHEMA,
    city: CITY_VALIDATION_SCHEMA,
    postalCode: z.string().min(1, { message: 'Postal code required' }),
    country: COUNTRY_VALIDATION_SCHEMA,
  })
  .superRefine((values, ctx) => {
    if (values.country === 'CA' && !CANADA_POSTCODE_VALIDATION_SCHEMA.safeParse(values.postalCode).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Postal code must follow the format for Canada (e.g., A1B 2C3)',
        path: ['postalCode'],
      });
    } else if (values.country === 'US' && !US_POSTCODE_VALIDATION_SCHEMA.safeParse(values.postalCode).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Postal code must follow the format for the USA (e.g., 12345)',
        path: ['postalCode'],
      });
    }
  });
