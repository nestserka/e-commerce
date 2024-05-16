import { type AuthMiddlewareOptions, ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';

// export type RefreshTokenData= {
//   access_token: string;
//   expires_at: number;
//   expires_in: number;
//   scope: string;
//   token_type: string;
//   refresh_token?: string;
// }

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

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_APP_AUTH_URL,
  projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
  credentials: {
    clientId: import.meta.env.VITE_APP_ADMIN_CLIENT_ID,
    clientSecret: import.meta.env.VITE_APP_ADMIN_CLIENT_SECRET,
  },
  scopes: ['manage_project:nasa-store'],
  fetch,
};

// export const authClient = new SdkAuth({
//   host: import.meta.env.AUTH_URL,
//   projectKey: import.meta.env.PROJECT_KEY,
//   disableRefreshToken: false,
//   credentials: {
//     clientId: import.meta.env.ADMIN_CLIENT_ID,
//     clientSecret: import.meta.env.ADMIN_CLIENT_SECRET,
//   },
//   scopes: ['manage_project:nasa-store'],
//   fetch,
// });

// export const tokenAdmin = authClient.clientCredentialsFlow();

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_APP_API_URL,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

// export const getCustomerToken = async (username: string, password: string): Promise<IRefreshTokenData> => {
//   const customer = await authClient.customerPasswordFlow(
//     {
//       username,
//       password,
//     },
//     {
//       disableRefreshToken: false,
//     },
//   );

//   return customer;
// };

// export const refreshTokenFlow = async (token: string): Promise<IRefreshTokenData> => {
//   const customer = await authClient.refreshTokenFlow(token);

//   return customer;
// };

// export const anonymousSessionFlow = async (id?: string): Promise<IRefreshTokenData> => {
//   let customer;

//   if (id) {
//     customer = authClient.anonymousFlow(id);
//   } else {
//     customer = authClient.anonymousFlow();
//   }

//   return customer;
// };

export const apiRoot = createApiBuilderFromCtpClient(
  ctpClient,
  'https://auth.us-central1.gcp.commercetools.com/',
).withProjectKey({
  projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
});

export async function createCustomerMeAdmin(): Promise<ClientResponse<CustomerSignInResult>> {
  const customer = await apiRoot
    .me()
    .signup()
    .post({
      body: {
        email: 'johndoe600094@example.com',
        firstName: 'John4',
        lastName: 'Doe4',
        password: 'secret1224',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .execute();

  console.log(customer);

  return customer;
}
