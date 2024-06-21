import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { tokenCache } from '../token/MyTokenCache';

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import type { AnonymousAuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

export default function withAnonymousFlow(): ByProjectKeyRequestBuilder {
  if (typeof import.meta.env.VITE_APP_AUTH_URL !== 'string') {
    throw new Error('no auth url found');
  }

  if (typeof import.meta.env.VITE_APP_ADMIN_CLIENT_SECRET !== 'string') {
    throw new Error('no admin client secret found');
  }

  if (typeof import.meta.env.VITE_APP_PROJECT_KEY !== 'string') {
    throw new Error('no project key found');
  }

  if (typeof import.meta.env.VITE_APP_API_URL !== 'string') {
    throw new Error('no api url found');
  }

  if (typeof import.meta.env.VITE_APP_CLIENT_ID !== 'string') {
    throw new Error('no api client id found');
  }

  if (typeof import.meta.env.VITE_APP_CLIENT_SECRET !== 'string') {
    throw new Error('no api client id found');
  }

  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: import.meta.env.VITE_APP_AUTH_URL,
    projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
    credentials: {
      clientId: import.meta.env.VITE_APP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_APP_CLIENT_SECRET,
    },
    scopes: [import.meta.env.VITE_APP_CLIENT_SCOPES],
    tokenCache,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_APP_API_URL,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(import.meta.env.VITE_APP_PROJECT_KEY)
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: import.meta.env.VITE_APP_PROJECT_KEY });
}
