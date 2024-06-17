import withRefreshToken from '../../middlewareFlows/withRefreshToken';
import { tokenCache } from '../../token/MyTokenCache';

import type { Cart, ClientResponse, MyCartAddDiscountCodeAction } from '@commercetools/platform-sdk';

export default async function addDiscountCodeToCart(cartId: string, version: number, code: string): Promise<Cart> {
  const token = tokenCache.get().refreshToken;

  const action: MyCartAddDiscountCodeAction = {
    action: 'addDiscountCode',
    code,
  };

  const body = {
    version,
    actions: [action],
  };

  const response: ClientResponse<Cart> = await withRefreshToken(token ?? '')
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({ body })
    .execute();

  console.log(`Promocode ${code} added to cart with id ${cartId}`);
  console.log('Updated cart:', response.body);

  return response.body;
}
