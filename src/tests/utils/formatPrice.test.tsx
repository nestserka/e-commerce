import { describe, expect, it } from 'vitest';

import { formatPrice } from '../../utils/utils';

describe('formatPrice function', () => {
  it('formats a number into a price string correctly', () => {
    expect(formatPrice(1000)).toBe('$10.00');
    expect(formatPrice(500)).toBe('$5.00');
    expect(formatPrice(123456)).toBe('$1234.56');
    expect(formatPrice(999)).toBe('$9.99');
  });

  it('handles edge cases', () => {
    expect(formatPrice(0)).toBe('$0.00');
    expect(formatPrice(1)).toBe('$0.01');
    expect(formatPrice(999999)).toBe('$9999.99');
  });
});
