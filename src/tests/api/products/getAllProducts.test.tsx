import { describe, expect, it } from 'vitest';

import withClientCredentialsFlow from '../../../api/middlewareFlows/withClientCredentials';

import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/sdk-client-v2';

describe('testing product endpoint', () => {
  it('should get all products', async () => {
    const response = (await withClientCredentialsFlow()
      .productProjections()
      .get()
      .execute()) as ClientResponse<ProductProjectionPagedQueryResponse>;

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});
