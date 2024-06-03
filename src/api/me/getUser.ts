import withRefreshToken from '../middlewareFlows/withRefreshToken';
import { tokenCache } from '../token/MyTokenCache';

import type { ClientResponse, Customer } from '@commercetools/platform-sdk';

export default async function getUser(): Promise<Customer> {
  const accessToken = tokenCache.get().refreshToken;
  const customer: ClientResponse<Customer> = await withRefreshToken(accessToken ?? '')
    .me()
    .get()
    .execute();

  return customer.body;
}
