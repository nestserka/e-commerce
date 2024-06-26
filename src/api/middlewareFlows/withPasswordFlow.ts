import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import type { HttpMiddlewareOptions, PasswordAuthMiddlewareOptions, TokenCache } from '@commercetools/sdk-client-v2';

export default function withPasswordFlow(
  username: string,
  password: string,
  tokenCache: TokenCache,
): ByProjectKeyRequestBuilder {
  if (typeof import.meta.env.VITE_APP_PASSWORD_FLOW_ID !== 'string') {
    throw new Error('no admin client id found');
  }

  if (typeof import.meta.env.VITE_APP_PASSWORD_FLOW_SECRET !== 'string') {
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

  const options: PasswordAuthMiddlewareOptions = {
    host: import.meta.env.VITE_APP_AUTH_URL,
    projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
    credentials: {
      clientId: import.meta.env.VITE_APP_PASSWORD_FLOW_ID,
      clientSecret: import.meta.env.VITE_APP_PASSWORD_FLOW_SECRET,
      user: {
        username,
        password,
      },
    },
    scopes: [import.meta.env.VITE_APP_PASSWORD_FLOW_SCOPE],
    tokenCache,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_APP_API_URL,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(import.meta.env.VITE_APP_PROJECT_KEY)
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
  });
}
