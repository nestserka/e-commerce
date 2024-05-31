import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { tokenCache } from '../token/NasaTokenCache';

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import type { HttpMiddlewareOptions, RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';

export default function withRefreshToken(refreshToken: string): ByProjectKeyRequestBuilder {
  if (typeof import.meta.env.VITE_APP_ADMIN_CLIENT_ID !== 'string') {
    throw new Error('no admin client id found');
  }

  if (typeof import.meta.env.VITE_APP_ADMIN_CLIENT_SECRET !== 'string') {
    throw new Error('no admin client secret found');
  }

  if (typeof import.meta.env.VITE_APP_AUTH_URL !== 'string') {
    throw new Error('no auth url found');
  }

  if (typeof import.meta.env.VITE_APP_PROJECT_KEY !== 'string') {
    throw new Error('no project key found');
  }

  if (typeof import.meta.env.VITE_APP_API_URL !== 'string') {
    throw new Error('no api url found');
  }

  const options: RefreshAuthMiddlewareOptions = {
    host: import.meta.env.VITE_APP_AUTH_URL,
    projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
    credentials: {
      clientId: import.meta.env.VITE_APP_ADMIN_CLIENT_ID,
      clientSecret: import.meta.env.VITE_APP_ADMIN_CLIENT_SECRET,
    },
    refreshToken,
    tokenCache,
    fetch,
    // scope???
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_APP_API_URL,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(import.meta.env.VITE_APP_PROJECT_KEY)
    .withRefreshTokenFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
  });
}
