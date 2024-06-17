import { describe, expect, it } from 'vitest';

import { EMAIL_VALIDATION_SCHEMA } from "../../constants/constants";

describe('Validation Schemas', () => {
  it('should validate correct email format', () => {
    expect(EMAIL_VALIDATION_SCHEMA.safeParse('user@example.com').success).toBe(true);
  });

  it('should fail on email longer than 254 characters', () => {
    expect(EMAIL_VALIDATION_SCHEMA.safeParse('a'.repeat(255)).success).toBe(false);
  });

  it('should fail on email without "@" symbol', () => {
    expect(EMAIL_VALIDATION_SCHEMA.safeParse('userexample.com').success).toBe(false);
  });

  it('should fail on email with spaces around "@" symbol', () => {
    expect(EMAIL_VALIDATION_SCHEMA.safeParse('user @example.com').success).toBe(false);
  });

  it('should fail on email with dot after "@" symbol', () => {
    expect(EMAIL_VALIDATION_SCHEMA.safeParse('user@.com').success).toBe(false);
  });
});
