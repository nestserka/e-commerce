import withRefreshToken from '../middlewareFlows/withRefreshToken';

import type { ClientResponse, Customer } from '@commercetools/platform-sdk';

export default async function getUser(): Promise<Customer> {
  const accessToken = localStorage.getItem('token');
  const customer: ClientResponse<Customer> = await withRefreshToken(accessToken ?? '')
    .me()
    .get()
    .execute();

  return customer.body;
}
