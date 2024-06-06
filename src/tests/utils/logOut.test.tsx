import { describe, expect, it, vi } from 'vitest';

import { logOut } from '../../utils/logOut';
import { tokenCache } from '../../api/token/MyTokenCache';

describe('logOut', () => {
  it('clears user authentication data and state', () => {
    const clearTokenCacheMock = vi.fn();
    tokenCache.clear = clearTokenCacheMock;

    logOut();

    expect(clearTokenCacheMock).toHaveBeenCalled();
  });
});
