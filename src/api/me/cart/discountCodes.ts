import withClientCredentialsFlow from '../../middlewareFlows/withClientCredentials';

import type { DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';

export default async function getDiscountCodes(): Promise<DiscountCodePagedQueryResponse | undefined> {
  try {
    const response = await withClientCredentialsFlow().discountCodes().get().execute();

    return response.body;
  } catch (error) {
    return undefined;
  }
}
