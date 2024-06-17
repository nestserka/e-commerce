import { describe, expect, it } from 'vitest';

import withClientCredentialsFlow from '../../../api/middlewareFlows/withClientCredentials';
import getProductById from '../../../api/products/getProductById';

import type { ProductProjection } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/sdk-client-v2';

const productKey = 'mundrabilla-29-5g';

describe('testing product endpoint', () => {
  it('should get product by id', async () => {
    const response = (await withClientCredentialsFlow()
      .productProjections()
      .withKey({ key: productKey })
      .get({ queryArgs: { expand: 'categories[*].parent' } })
      .execute()) as ClientResponse<ProductProjection>;

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
  it('should return correct product by key', async () => {
    const productById = await getProductById(productKey);
    expect(productById).toHaveProperty('id');
  });
});
