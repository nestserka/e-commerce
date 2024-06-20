import withRefreshToken from '../../middlewareFlows/withRefreshToken';
import { tokenCache } from '../../token/MyTokenCache';

import type { Cart, ClientResponse, MyCartRemoveLineItemAction } from '@commercetools/platform-sdk';

export default async function removeProductFromCart(
  cartId: string,
  action: MyCartRemoveLineItemAction[],
  version: number,
): Promise<Cart> {
  const token = tokenCache.get().refreshToken;

  const body = {
    version,
    actions: action,
  };

  const response: ClientResponse<Cart> = await withRefreshToken(token ?? '')
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({ body })
    .execute();

  return response.body;
}
