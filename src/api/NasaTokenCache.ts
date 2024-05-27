import { LS_PREFIX } from '../constants/constants';
import { isTokenStore } from '../utils/types';

import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class NasaTokenCache implements TokenCache {
  myCache: TokenStore = { token: '', expirationTime: 0, refreshToken: undefined };

  set(newCache: TokenStore): void {
    Object.assign(this.myCache, newCache);
    const serializedCache = JSON.stringify(this.myCache);
    localStorage.setItem(`token-${LS_PREFIX}`, serializedCache);
  }

  get(): TokenStore {
    const token = localStorage.getItem(`token-${LS_PREFIX}`);

    if (token) {
      const parsedToken: unknown = JSON.parse(token);

      if (isTokenStore(parsedToken)) {
        if (parsedToken.expirationTime && parsedToken.expirationTime < Date.now()) {
          this.clear();
        } else {
          this.myCache = parsedToken;
        }
      }
    }

    return this.myCache;
  }

  clear(): void {
    this.myCache = { token: '', expirationTime: 0, refreshToken: undefined };
    localStorage.removeItem(`token-${LS_PREFIX}`);
  }
}

export const tokenCache = new NasaTokenCache();
