import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class MyTokenCache implements TokenCache {
  private tokenData: TokenStore;

  constructor() {
    this.tokenData = {
      token: '',
      refreshToken: '',
      expirationTime: 0,
    };
  }

  set(newToken: TokenStore): void {
    this.tokenData = newToken;
  }

  get(): TokenStore {
    return this.tokenData;
  }
}
