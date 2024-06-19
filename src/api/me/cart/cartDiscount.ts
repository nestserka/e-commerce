import withClientCredentialsFlow from '../../middlewareFlows/withClientCredentials';

import type { CartDiscountPagedQueryResponse } from '@commercetools/platform-sdk';

export default async function getCartDiscounts(): Promise<CartDiscountPagedQueryResponse | undefined> {
  try {
    const response = await withClientCredentialsFlow().cartDiscounts().get().execute();

    return response.body;
  } catch (error) {
    return undefined;
  }
}
