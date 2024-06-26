import withRefreshToken from '../../middlewareFlows/withRefreshToken';
import { tokenCache } from '../../token/MyTokenCache';

import type { Cart, ClientResponse, MyCartAddLineItemAction } from '@commercetools/platform-sdk';

export default async function addProductToCustomerCart(
  cartId: string,
  productId: string,
  version: number,
  quantity: number = 1,
): Promise<Cart> {
  const token = tokenCache.get().refreshToken;

  const itemData: MyCartAddLineItemAction = {
    action: 'addLineItem',
    productId,
    quantity,
  };

  const body = {
    version,
    actions: [itemData],
  };

  const response: ClientResponse<Cart> = await withRefreshToken(token ?? '')
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({ body })
    .execute();

  return response.body;
}
