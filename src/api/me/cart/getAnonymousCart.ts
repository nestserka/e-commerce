import withAnonymousFlow from '../../middlewareFlows/withAnonymousFlow';

import type { Cart, ClientResponse } from '@commercetools/platform-sdk';

export default async function getAnonymousCart(): Promise<Cart> {
  const response: ClientResponse<Cart> = await withAnonymousFlow().me().activeCart().get().execute();

  return response.body;
}
