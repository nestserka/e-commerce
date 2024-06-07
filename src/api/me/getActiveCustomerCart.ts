import withRefreshToken from '../middlewareFlows/withRefreshToken';
import { tokenCache } from '../token/MyTokenCache';

import type { Cart, ClientResponse } from '@commercetools/platform-sdk';

export default async function getCustomerCart(cartId: string): Promise<Cart | undefined> {
  const accessToken = tokenCache.get().refreshToken;

  const response: ClientResponse<Cart> = await withRefreshToken(accessToken ?? '')
    .me()
    .carts()
    .withId({ ID: cartId })
    .get()
    .execute();

  return response.body;
}
