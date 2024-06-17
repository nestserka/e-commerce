import { describe, expect, it } from 'vitest';

import withAnonymousFlow from '../../../api/middlewareFlows/withAnonymousFlow';

import type { Cart } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/sdk-client-v2';

const body = {
  currency: 'USD',
};

describe('testing creating anonymous cart', () => {
  it('should create anonymous cart', async () => {
    const responseLoginMe = (await withAnonymousFlow()
      .me()
      .carts()
      .post({
        body,
      })
      .execute()) as ClientResponse<Cart>;

    expect(responseLoginMe.statusCode).toBe(201);
    expect(responseLoginMe.body?.cartState).toBeDefined();
  });
});
