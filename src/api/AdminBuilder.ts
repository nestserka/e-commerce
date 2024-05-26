import { type AuthMiddlewareOptions, ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

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

export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_APP_AUTH_URL,
  projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
  credentials: {
    clientId: import.meta.env.VITE_APP_ADMIN_CLIENT_ID,
    clientSecret: import.meta.env.VITE_APP_ADMIN_CLIENT_SECRET,
  },
  scopes: [import.meta.env.VITE_APP_ADMIN_SCOPES],
  fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_APP_API_URL,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient, import.meta.env.VITE_APP_AUTH_URL).withProjectKey({
  projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
});
