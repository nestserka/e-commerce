import { LS_PREFIX } from '../../constants/constants';
import { isTokenStore } from '../../utils/types';

import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  private tokenData: TokenStore;

  constructor() {
    this.tokenData = {
      token: '',
      refreshToken: '',
      expirationTime: 0,
    };
  }

  set(newCache: TokenStore): void {
    Object.assign(this.tokenData, newCache);
    const serializedCache = JSON.stringify(this.tokenData);
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
          this.tokenData = parsedToken;
        }
      }
    }

    return this.tokenData;
  }

  clear(): void {
    this.tokenData = { token: '', expirationTime: 0, refreshToken: '' };
    localStorage.removeItem(`token-${LS_PREFIX}`);
    localStorage.removeItem('token');
  }
}

export const tokenCache = new MyTokenCache();
