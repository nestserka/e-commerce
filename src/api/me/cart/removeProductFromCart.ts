import withRefreshToken from '../../middlewareFlows/withRefreshToken';
import { tokenCache } from '../../token/MyTokenCache';

import type { Cart, ClientResponse, MyCartUpdateAction } from '@commercetools/platform-sdk';

interface itemData {
  cartId: string;
}

export default async function removeProductFromCart(
  cartId: string,
  productId: string,
  version: number,
  quantity?: number | undefined,
): Promise<Cart> {
  const token = tokenCache.get().refreshToken;

  const itemData: MyCartUpdateAction = quantity
    ? {
        action: 'changeLineItemQuantity',
        lineItemId: productId,
        quantity,
      }
    : {
        action: 'removeLineItem',
        lineItemId: productId,
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

  console.log(`Product ${productId} removed from cart with id ${cartId}`);
  console.log('Updated cart:', response.body);

  return response.body;
}
