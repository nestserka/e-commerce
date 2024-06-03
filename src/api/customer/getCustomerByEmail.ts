import withClientCredentialsFlow from '../middlewareFlows/withClientCredentials';

import type { CustomerPagedQueryResponse } from '@commercetools/platform-sdk';

export default async function getCustomerByEmail(email: string): Promise<CustomerPagedQueryResponse | undefined> {
  try {
    const response = await withClientCredentialsFlow()
      .customers()
      .get({
        queryArgs: {
          where: `email="${email}"`,
        },
      })
      .execute();

    return response.body;
  } catch (error) {
    return undefined;
  }
}
