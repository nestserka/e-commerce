import withRefreshToken from '../middlewareFlows/withRefreshToken';
import { tokenCache } from '../token/MyTokenCache';

import type { Cart, ClientResponse } from '@commercetools/platform-sdk';

export default async function getCustomerActiveCart(): Promise<Cart | undefined> {
  const accessToken = tokenCache.get().refreshToken;

  const response: ClientResponse<Cart> = await withRefreshToken(accessToken ?? '')
    .me()
    .activeCart()
    .get()
    .execute();

  return response.body;
}
