import { describe, expect, it } from 'vitest';

import { formatDateOfBirth, formatPrice, getInputProps, handleLoginError } from '../../utils/utils';

describe('getInputProps', () => {
  it('returns the correct input props', () => {
    const inputProps = getInputProps('text', 'email', 'Email', 'email');
    expect(inputProps).toEqual({
      type: 'text',
      id: 'email',
      placeholder: 'Email',
      autoComplete: 'email',
    });
  });
});

describe('handleLoginError', () => {
  it('returns correct error message when count is 0', () => {
    const result = handleLoginError(0);
    expect(result).toEqual({
      error: {
        isEmail: true,
        message: 'Invalid email: There is no such user registered',
      },
    });
  });

  it('returns correct error message when count is greater than 0', () => {
    const result = handleLoginError(2);
    expect(result).toEqual({
      error: {
        isPassword: true,
        message: 'Invalid password: You provided wrong password',
      },
    });
  });

  it('returns generic form error message when count is undefined', () => {
    const result = handleLoginError(undefined);
    expect(result).toEqual({
      error: {
        isForm: true,
        message: 'Form error',
      },
    });
  });
});

describe('formatDateOfBirth', () => {
  it('formats date of birth correctly', () => {
    const formattedDate = formatDateOfBirth('1990-01-01');
    expect(formattedDate).toBe('01.01.1990');
  });
});

describe('formatPrice', () => {
  it('formats price correctly', () => {
    const formattedPrice = formatPrice(12345);
    expect(formattedPrice).toBe('$123.45');
  });
});
