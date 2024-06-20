import withRefreshToken from '../../middlewareFlows/withRefreshToken';
import { tokenCache } from '../../token/MyTokenCache';

import type { Cart, MyCartRemoveDiscountCodeAction } from '@commercetools/platform-sdk';

export default async function removeDiscountsFromCard(
  body: MyCartRemoveDiscountCodeAction,
  version: number,
  id: string,
): Promise<Cart> {
  const token = tokenCache.get().refreshToken;
  const actions = Array.isArray(body) ? body : [body];

  const response = await withRefreshToken(token ?? '')
    .me()
    .carts()
    .withId({
      ID: id,
    })
    .post({
      body: {
        version,
        actions,
      },
    })
    .execute();

  return response.body;
}
