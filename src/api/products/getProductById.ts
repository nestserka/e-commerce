import withClientCredentialsFlow from '../middlewareFlows/withClientCredentials';

import type { ClientResponse, ProductProjection } from '@commercetools/platform-sdk';

export default async function getProductById(productKey: string): Promise<ClientResponse<ProductProjection>> {
  try {
    const response: ClientResponse<ProductProjection> = await withClientCredentialsFlow()
      .productProjections()
      .withKey({ key: productKey })
      .get()
      .execute();

    return response;
  } catch (error) {
    throw new Error('no products found with the specified key');
  }
}
