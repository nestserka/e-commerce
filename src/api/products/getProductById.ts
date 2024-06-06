import withClientCredentialsFlow from '../middlewareFlows/withClientCredentials';

import type { ClientResponse, ProductProjection } from '@commercetools/platform-sdk';

export default async function getProductById(productKey: string): Promise<ProductProjection> {
  try {
    const response: ClientResponse<ProductProjection> = await withClientCredentialsFlow()
      .productProjections()
      .withKey({ key: productKey })
      .get({ queryArgs: { expand: 'categories[*].parent' } })
      .execute();

    return response.body;
  } catch (error) {
    throw new Error('no products found with the specified key');
  }
}
