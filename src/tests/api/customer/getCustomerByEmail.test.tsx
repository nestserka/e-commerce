import { describe, expect, it } from 'vitest';

import withClientCredentialsFlow from '../../../api/middlewareFlows/withClientCredentials';
import getCustomerByEmail from '../../../api/customer/getCustomerByEmail';

import type { CustomerPagedQueryResponse } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/sdk-client-v2';

describe('testing endpoint customer', () => {
  it('should return customer if any', async () => {
    const email = 'finaltest@gmail.com';
    const response = (await withClientCredentialsFlow()
      .customers()
      .get({
        queryArgs: {
          where: `email="${email}"`,
        },
      })
      .execute()) as ClientResponse<CustomerPagedQueryResponse>;

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
  it('should return customer data when the email exists', async () => {
    const email = 'finaltest@gmail.com';
    const customerData = await getCustomerByEmail(email);
    expect(customerData?.results[0].email).toBe(email);
  });
});
