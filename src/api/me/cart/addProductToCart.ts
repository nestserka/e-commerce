import withRefreshToken from '../../middlewareFlows/withRefreshToken';
import { tokenCache } from '../../token/MyTokenCache';

import type { Cart, ClientResponse, MyCartAddLineItemAction } from '@commercetools/platform-sdk';

export default async function addProductToCustomerCart(
  cartId: string,
  productId: string,
  version: number,
  quantity: number = 1,
): Promise<void> {
  const token = tokenCache.get().refreshToken;

  const body = {
    version,
    actions: [
      {
        action: 'addLineItem',
        productId,
        quantity,
      } as MyCartAddLineItemAction,
    ],
  };

  const response: ClientResponse<Cart> = await withRefreshToken(token ?? '')
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({ body })
    .execute();

  console.log(`Product ${productId} added to cart with id ${cartId}`);
  console.log('Updated cart:', response.body);
}
