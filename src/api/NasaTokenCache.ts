import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
const storageKey = import.meta.env.VITE_STORAGE_KEY;

class NasaTokenCache implements TokenCache {
  myCache: TokenStore = { token: '', expirationTime: 0, refreshToken: undefined };

  set(newCache: TokenStore) {
    Object.assign(this.myCache, newCache);
    const serializedCache = JSON.stringify(this.myCache);
    localStorage.setItem(storageKey, serializedCache);
  }

  get(): TokenStore {
    return this.myCache;
  }

  clear() {
    this.myCache = { token: '', expirationTime: 0, refreshToken: undefined };
  }
}

export const tokenCache = new NasaTokenCache();
