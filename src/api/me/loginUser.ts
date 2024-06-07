import { tokenCache } from '../token/MyTokenCache';
import withPasswordFlow from '../middlewareFlows/withPasswordFlow';

import type { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';

export default async function loginUser(email: string, password: string): Promise<Customer> {
  tokenCache.clear();

  const response: ClientResponse<CustomerSignInResult> = await withPasswordFlow(email, password, tokenCache)
    .me()
    .login()
    .post({
      body: {
        email,
        password,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .execute();

  return response.body.customer;
}
