import { type AuthMiddlewareOptions, ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { getCustomerByEmail } from './AdminBuilder';
import { handleLoginError } from '../utils/utils';

import type { ErrorLoginForm } from '../utils/utils';
import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';

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
  scopes: [
    'manage_my_quotes:nasa-store manage_my_shopping_lists:nasa-store:nasa-store view_published_products:nasa-store manage_my_payments:nasa-store manage_my_orders:nasa-store:nasa-store view_orders:nasa-store manage_my_orders:nasa-store manage_my_quote_requests:nasa-store view_cart_discounts:nasa-store:nasa-store view_shopping_lists:nasa-store:nasa-store manage_my_profile:nasa-store manage_my_business_units:nasa-store manage_my_shopping_lists:nasa-store view_order_edits:nasa-store view_orders:nasa-store:nasa-store create_anonymous_token:nasa-store manage_my_profile:nasa-store:nasa-store view_categories:nasa-store',
  ],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_APP_API_URL,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const apiRoot = createApiBuilderFromCtpClient(
  ctpClient,
  'https://auth.us-central1.gcp.commercetools.com/',
).withProjectKey({
  projectKey: import.meta.env.VITE_APP_PROJECT_KEY,
});

// export interface CustomerLoginDraft {
//   email: string;
//   password: string;
//   anonymousCart?: {
//     id: string;
//     typeId: string;
//   };
//   anonymousCartSignInMode?: string;
//   anonymousID?: string;
// }

export async function createCustomerMe(): Promise<ClientResponse<CustomerSignInResult>> {
  const customer = await apiRoot
    .me()
    .signup()
    .post({
      body: {
        email: 'johndoe600904@example.com',
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

export const loginUser = async (
  email: string,

  password: string,
): Promise<ClientResponse<CustomerSignInResult> | ErrorLoginForm> => {
  try {
    const customer = await apiRoot
      .me()
      .login()
      .post({
        body: {
          email,
          password,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();

    return customer;
  } catch (error) {
    let errorResponse;
    const isUserByEmailResponse = await getCustomerByEmail(email);

    if (isUserByEmailResponse) {
      errorResponse = handleLoginError(isUserByEmailResponse.body.count);

      return errorResponse;
    }

    return {
      error: {
        isForm: true,
        message: 'Form error',
      },
    };
  }
};
