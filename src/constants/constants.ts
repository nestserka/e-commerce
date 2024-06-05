import { z } from 'zod';
import dayjs from 'dayjs';

import type { OptionsFromSelect } from '../pages/categoryPage/types';
import type { NavLinkProps } from '../domain/header/navigation/types';

export const ROUTES = {
  START: '/',
  HOME: '/home',
  PRODUCT_BESTSELLER: 'main/:productId',
  SING_IN: '/sign_in',
  SING_UP: '/sign_up',
  ABOUT: '/about',
  CATALOG: '/catalog',
  CATALOG_ALL: '/catalog/all',
  CATEGORY: '/catalog/:category',
  PRODUCT: '/catalog/:category/:productId',
  PROFILE: '/profile/:customerId',
  CART: '/cart',
  CART_CUSTOMER: '/cart/:customerId',
  NOT_FOUND: '*',
} as const;

export const DYNAMIC_ROUTES = {
  PROFILE: '/profile/',
  PRODUCT: '/catalog/',
  CARD: '/card/',
  CATEGORY: '/catalog',
  BESTSELLER: 'main/',
} as const;

export const NAV_LINKS: NavLinkProps[] = [
  { title: 'Home', route: ROUTES.HOME },
  { title: 'Catalog', route: ROUTES.CATALOG_ALL },
  { title: 'About', route: ROUTES.ABOUT },
  { title: 'Sign In', route: ROUTES.SING_IN },
  { title: 'Sign Up', route: ROUTES.SING_UP },
] as const;

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

const ATEXT = /[a-zA-Z0-9_]/i;
const DOT_ATOM = new RegExp(`^${ATEXT.source}+(\\.${ATEXT.source}+)*$`, 'i');

export const EMAIL_VALIDATION_SCHEMA = z
  .string()
  .max(254, { message: 'Email must be no longer than 254 characters.' })
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

      if (!DOT_ATOM.test(parts[0]) || !/^[a-zA-Z.]*$/.test(parts[1])) {
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

        if (domainParts.length !== 2 || domainParts[1].length < 2 || domainParts[0].length < 1) {
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
    .trim()
    .min(1, `${fieldName} must contain at least one character.`)
    .max(150, { message: 'Name and Surname must be no longer than 150 characters.' })
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
      message: 'Birthday cannot be in the future.',
    },
  )
  .refine((date) => calculateAge(date) >= MIN_AGE, {
    message: `User must be at least ${MIN_AGE} years old.`,
  })
  .transform((date) => dayjs(date).format('YYYY-MM-DD'));

const STREET_VALIDATION_SCHEMA = z
  .string()
  .trim()
  .min(1, `Street must contain at least one character.`)
  .max(200, { message: 'Street must be no longer than 200 characters.' })
  .refine((value) => /^[a-zA-Z0-9\s]*$/.test(value), {
    message: `Street must contain only Latin characters, numbers, and spaces.`,
  });

const CITY_VALIDATION_SCHEMA = z
  .string()
  .trim()
  .min(1, `City must contain at least one character.`)
  .max(150, { message: 'City must be no longer than 150 characters.' })
  .refine((value) => /^[a-zA-Z]*$/.test(value), {
    message: `City must contain only Latin characters and no spaces.`,
  });

const validCountries = ['US', 'CA'];
const validAddressType = ['shipping', 'billing'];

const COUNTRY_VALIDATION_SCHEMA = z.string().refine((value) => validCountries.includes(value), {
  message: 'Country must be a valid country from the predefined list.',
});

const CANADA_POSTCODE_VALIDATION_SCHEMA = z
  .string()
  .trim()
  .refine((value) => /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/.test(value), {
    message: 'Postal code must follow the format for CANADA (e.g., A1B 2C3)',
  });

export const US_POSTCODE_VALIDATION_SCHEMA = z.string().refine((value) => /^\d{5}$/.test(value), {
  message: 'Postal code must follow the format for the USA (e.g., 12345)',
});

export const ADDRESS_VALIDATION_SCHEMA = z
  .object({
    streetName: STREET_VALIDATION_SCHEMA,
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

export const INPUT_DATE_VALIDATION_SCHEMA = z
  .string()
  .refine((value) => /^\d{2}\.\d{2}\.\d{4}$/.test(value), {
    message: 'Invalid format',
  })
  .refine(
    (value) => {
      const parts = value.split('.');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);

      if (day <= 0 || day > 31 || month < 0 || month > 11 || year <= 0) {
        return false;
      }

      const daysInMonth = dayjs().set('year', year).set('month', month).daysInMonth();
      const currentYear = dayjs().year();

      if (day > daysInMonth) {
        return false;
      }

      if (year > currentYear) {
        return false;
      }

      return true;
    },
    {
      message: 'Invalid day, month, or year.',
    },
  )
  .refine(
    (value) => {
      const parts = value.split('.');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);

      if (day <= 0 || day > 31 || month < 0 || month > 11 || year <= 0) {
        return false;
      }

      if (year < 1900) {
        return false;
      }

      return true;
    },
    {
      message: 'The max age to be set is starting from 1900',
    },
  )
  .refine(
    (value) => {
      const parts = value.split('.');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const parsedDate = new Date(year, month, day);
      const dateOfBirth = dayjs(parsedDate);

      if (dateOfBirth.isValid()) {
        const today = dayjs();
        const age = today.diff(dateOfBirth, 'year');

        if (age < 13) {
          return false;
        }

        return true;
      }

      return false;
    },
    {
      message: 'You must be at least 13 years old.',
    },
  )
  .transform((date) => {
    const [day, month, year] = date.split('.');

    return `${year}-${month}-${day}`;
  });

export const SHIPPING_TYPE_VALIDATION_SCHEMA = z.string().refine((value) => validAddressType.includes(value), {
  message: 'Address type must be a valid type from the predefined list.',
});

export const LS_PREFIX = 'nasaStoreTeam';

export const OPTIONS_FROM_SORT: OptionsFromSelect[] = [
  {
    value: 'name.en asc',
    label: 'Name from A to Z',
  },
  {
    value: 'name.en desc',
    label: 'Name from Z to A',
  },
  {
    value: 'price asc',
    label: 'Price from low to high',
  },
  {
    value: 'price desc',
    label: 'Price from high to low',
  },
];

export const requiredEnvVariables = {
  VITE_APP_PASSWORD_FLOW_SECRET: 'login with password client id',
  VITE_APP_PASSWORD_FLOW_ID: 'login with password client secret',
  VITE_APP_AUTH_URL: 'auth url',
  VITE_APP_PROJECT_KEY: 'project key',
  VITE_APP_API_URL: 'api url',
};

export const ERROR_TYPES = {
  INVALID_REFRESH_TOKEN: 'refresh token',
  VERSION_ERROR: 'different version than expected',
  INVALID_JSON: 'JSON',
  INVALID_TOKEN: 'invalid_token',
} as const;
