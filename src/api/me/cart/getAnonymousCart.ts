import withAnonymousFlow from '../../middlewareFlows/withAnonymousFlow';

import type { Cart, ClientResponse } from '@commercetools/platform-sdk';

export default async function getAnonymousCart(anonymousCartId: string): Promise<Cart> {
  const response: ClientResponse<Cart> = await withAnonymousFlow()
    .me()
    .carts()
    .withId({ ID: anonymousCartId })
    .get()
    .execute();

  return response.body;
}
