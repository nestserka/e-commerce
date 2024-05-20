import { describe, expect, it } from 'vitest';
import dayjs from 'dayjs';

import { DATE_VALIDATION_SCHEMA, PASSWORD_VALIDATION_SCHEMA } from '../../constants/constants';

describe('Validation Schemas', () => {
  it('validates date with minimum age', () => {
    const validDate = dayjs().subtract(18, 'year').toDate();
    expect(() => {
      DATE_VALIDATION_SCHEMA.parse(validDate);
    }).not.toThrow();
  });
  it('throws error for date with future date', () => {
    const futureDate = dayjs().add(1, 'day').toDate();
    expect(() => {
      DATE_VALIDATION_SCHEMA.parse(futureDate);
    }).toThrowError('Birthday cannot be in the future.');
  });

  it('throws error for date with minimum age requirement', () => {
    const invalidDate = dayjs().subtract(12, 'year').toDate();
    expect(() => {
      DATE_VALIDATION_SCHEMA.parse(invalidDate);
    }).toThrowError('User must be at least 13 years old.');
  });

  describe('Password Validation Schema', () => {
    it('throws error for password less than 8 characters long', () => {
      const invalidPassword = 'abc';
      expect(() => PASSWORD_VALIDATION_SCHEMA.parse(invalidPassword)).toThrowError(
        'Password must be at least 8 characters long.',
      );
    });

    it('throws error for password without uppercase letter', () => {
      const invalidPassword = 'password';
      expect(() => PASSWORD_VALIDATION_SCHEMA.parse(invalidPassword)).toThrowError(
        'Password must contain at least one uppercase letter (A-Z).',
      );
    });

    it('throws error for password without lowercase letter', () => {
      const invalidPassword = 'PASSWORD';
      expect(() => PASSWORD_VALIDATION_SCHEMA.parse(invalidPassword)).toThrowError(
        'Password must contain at least one lowercase letter (a-z).',
      );
    });

    it('throws error for password without digit', () => {
      const invalidPassword = 'Password';
      expect(() => PASSWORD_VALIDATION_SCHEMA.parse(invalidPassword)).toThrowError(
        'Password must contain at least one digit (0-9).',
      );
    });

    it('throws error for password without special character', () => {
      const invalidPassword = 'Password123';
      expect(() => PASSWORD_VALIDATION_SCHEMA.parse(invalidPassword)).toThrowError(
        'Password must contain at least one special character (e.g., !@#$%^&*).',
      );
    });

    it('throws error for password containing whitespace', () => {
      const invalidPassword = 'Password! 123';
      expect(() => PASSWORD_VALIDATION_SCHEMA.parse(invalidPassword)).toThrowError(
        'Password must not contain whitespace.',
      );
    });

    it('does not throw error for valid password', () => {
      const validPassword = 'Password!123';
      expect(() => PASSWORD_VALIDATION_SCHEMA.parse(validPassword)).not.toThrow();
    });
  });
});
