import withAnonymousFlow from '../middlewareFlows/withAnonymousFlow';

import type { Cart, ClientResponse } from '@commercetools/platform-sdk';

export default async function getAnonymousCart(cartId: string): Promise<Cart> {
  const response: ClientResponse<Cart> = await withAnonymousFlow().me().carts().withId({ ID: cartId }).get().execute();

  return response.body;
}
