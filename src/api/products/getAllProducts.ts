import withClientCredentialsFlow from '../middlewareFlows/withClientCredentials';

import type { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

export default async function getAllProducts(): Promise<ProductProjectionPagedQueryResponse> {
  const response: ClientResponse<ProductProjectionPagedQueryResponse> = await withClientCredentialsFlow()
    .productProjections()
    .get()
    .execute();

  return response.body;
}
