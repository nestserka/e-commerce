import withRefreshToken from '../middlewareFlows/withRefreshToken';
import { tokenCache } from '../token/MyTokenCache';

import type { Cart, ClientResponse } from '@commercetools/platform-sdk';

export default async function createCustomerCart(): Promise<Cart> {
  const accessToken = tokenCache.get().refreshToken;
  const body = {
    currency: 'USD',
  };

  const response: ClientResponse<Cart> = await withRefreshToken(accessToken ?? '')
    .me()
    .carts()
    .post({
      body,
    })
    .execute();

  return response.body;
}
