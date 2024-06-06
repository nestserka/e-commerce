import withRefreshToken from '../middlewareFlows/withRefreshToken';
import { tokenCache } from '../token/MyTokenCache';

import type { CartPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';

export default async function getActiveCustomerCart(): Promise<CartPagedQueryResponse | undefined> {
  const accessToken = tokenCache.get().refreshToken;

  const response: ClientResponse<CartPagedQueryResponse> = await withRefreshToken(accessToken ?? '')
    .me()
    .carts()
    .get()
    .execute();

  return response.body;
}
