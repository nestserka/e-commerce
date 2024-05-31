import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import type { ExistingTokenMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

export default function withExistingToken(token: string): ByProjectKeyRequestBuilder {
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

  const options: ExistingTokenMiddlewareOptions = {
    force: false,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_APP_API_URL,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(import.meta.env.VITE_APP_PROJECT_KEY)
    .withExistingTokenFlow(`Bearer ${token}`, options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: import.meta.env.VITE_APP_PROJECT_KEY });
}
