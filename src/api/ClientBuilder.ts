import { type AuthMiddlewareOptions, ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

export const createClientBuilders = (): ByProjectKeyRequestBuilder => {
  if (typeof import.meta.env.VITE_APP_CLIENT_ID !== 'string') {
    throw new Error('no admin client id found');
  }

  if (typeof import.meta.env.VITE_APP_CLIENT_SECRET !== 'string') {
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

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: import.meta.env.VITE_APP_AUTH_URL,
    projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
    credentials: {
      clientId: import.meta.env.VITE_APP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_APP_CLIENT_SECRET,
    },
    scopes: [import.meta.env.VITE_APP_CLIENT_SCOPES],
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_APP_API_URL,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  const apiRoot = createApiBuilderFromCtpClient(
    ctpClient,
    'https://auth.us-central1.gcp.commercetools.com/',
  ).withProjectKey({
    projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
  });

  return apiRoot;
};
