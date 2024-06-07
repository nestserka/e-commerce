import withAnonymousFlow from '../middlewareFlows/withAnonymousFlow';

import type { Cart, ClientResponse } from '@commercetools/platform-sdk';

export default async function createAnonymousCart(): Promise<Cart> {
  const body = {
    currency: 'USD',
  };

  const response: ClientResponse<Cart> = await withAnonymousFlow()
    .me()
    .carts()
    .post({
      body,
    })
    .execute();

  return response.body;
}
