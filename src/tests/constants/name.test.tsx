import { describe, expect, it } from 'vitest';

import { FIRST_NAME_VALIDATION_SCHEMA, LAST_NAME_VALIDATION_SCHEMA } from '../../constants/constants';

describe('nameValidation', () => {
  describe('FIRST_NAME_VALIDATION_SCHEMA', () => {
    it('should validate valid first names', () => {
      const validNames = ['John', 'Alice', 'Bob'];
      validNames.forEach((name) => {
        expect(FIRST_NAME_VALIDATION_SCHEMA.safeParse(name).success).toBe(true);
      });
    });

    it('should not validate invalid first names', () => {
      const invalidNames = ['', '123John', 'John Doe', '@John']; 
      invalidNames.forEach((name) => {
        expect(FIRST_NAME_VALIDATION_SCHEMA.safeParse(name).success).toBe(false);
      });
    });
  });

  describe('LAST_NAME_VALIDATION_SCHEMA', () => {
    it('should validate valid last names', () => {
      const validNames = ['Doe', 'Smith', 'Johnson']; 
      validNames.forEach((name) => {
        expect(LAST_NAME_VALIDATION_SCHEMA.safeParse(name).success).toBe(true);
      });
    });

    it('should not validate invalid last names', () => {
      const invalidNames = ['', 'Doe123', 'Doe@', 'Doe-Smith']; 
      invalidNames.forEach((name) => {
        expect(LAST_NAME_VALIDATION_SCHEMA.safeParse(name).success).toBe(false);
      });
    });
  });
});
