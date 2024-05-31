import withRefreshToken from '../middlewareFlows/withRefreshToken';

import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

export default async function updateCustomer(version: number, data: MyCustomerUpdateAction[]): Promise<Customer> {
  const accessToken = localStorage.getItem('token');

  const response = await withRefreshToken(accessToken ?? '')
    .me()
    .post({
      body: {
        version,
        actions: data,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .execute();

  return response.body;
}
