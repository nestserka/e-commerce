import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import type { ExistingTokenMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

export const createClientWithAttachedToken = (token: string): ByProjectKeyRequestBuilder => {
  if (typeof import.meta.env.VITE_APP_AUTH_URL !== 'string') {
    throw new Error('no auth url found');
  }

  if (typeof import.meta.env.VITE_APP_PROJECT_KEY !== 'string') {
    throw new Error('no project key found');
  }

  if (typeof import.meta.env.VITE_APP_API_URL !== 'string') {
    throw new Error('no api url found');
  }

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_APP_API_URL,
    fetch,
  };

  const options: ExistingTokenMiddlewareOptions = {
    force: false,
  };

  const projectKey = import.meta.env.VITE_APP_PROJECT_KEY;

  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withExistingTokenFlow(`Bearer ${token}`, options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
  });

  return apiRoot;
};
