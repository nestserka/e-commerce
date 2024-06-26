import withRefreshToken from '../middlewareFlows/withRefreshToken';
import { tokenCache } from '../token/MyTokenCache';

import type { ClientResponse, Customer, MyCustomerChangePassword } from '@commercetools/platform-sdk';

export default async function updateCustomerPassword(data: MyCustomerChangePassword): Promise<Customer> {
  const accessToken = tokenCache.get().refreshToken;

  const response: ClientResponse<Customer> = await withRefreshToken(accessToken ?? '')
    .me()
    .password()
    .post({
      body: data,
    })
    .execute();

  return response.body;
}
