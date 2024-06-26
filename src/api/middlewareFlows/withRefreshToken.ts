import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import createAuthMiddlewareForRefreshTokenFlow from './createAuthMiddlewareForRefreshTokenFlow';
import { tokenCache } from '../token/MyTokenCache';

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import type { HttpMiddlewareOptions, RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';

export default function withRefreshToken(refreshToken: string): ByProjectKeyRequestBuilder {
  const options: RefreshAuthMiddlewareOptions = {
    host: import.meta.env.VITE_APP_AUTH_URL,
    projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
    credentials: {
      clientId: import.meta.env.VITE_APP_PASSWORD_FLOW_ID,
      clientSecret: import.meta.env.VITE_APP_PASSWORD_FLOW_SECRET,
    },
    refreshToken,
    tokenCache,
    fetch,
  };

  const authMiddleware = createAuthMiddlewareForRefreshTokenFlow({
    ...options,
  });

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_APP_API_URL,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(import.meta.env.VITE_APP_PROJECT_KEY)
    .withAuthMiddleware(authMiddleware)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
  });
}
