import { type Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { authMiddlewareOptions, httpMiddlewareOptions } from './AdminBuilder';

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

export const createAnonymousSessionFlow = (): ByProjectKeyRequestBuilder => {
  if (typeof import.meta.env.VITE_APP_AUTH_URL !== 'string') {
    throw new Error('no auth url found');
  }

  if (typeof import.meta.env.VITE_APP_PROJECT_KEY !== 'string') {
    throw new Error('no project key found');
  }

  const anonymousClient: Client = new ClientBuilder()
    .withAnonymousSessionFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  const apiRootAnonymous = createApiBuilderFromCtpClient(
    anonymousClient,
    import.meta.env.VITE_APP_AUTH_URL,
  ).withProjectKey({
    projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
  });

  return apiRootAnonymous;
};
