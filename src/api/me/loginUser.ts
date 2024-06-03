import { tokenCache } from '../token/MyTokenCache';
import withPasswordFlow from '../middlewareFlows/withPasswordFlow';
import { LS_PREFIX } from '../../constants/constants';

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
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .execute();

  const serializedCache = JSON.stringify(tokenCache.get());
  localStorage.setItem(`token-${LS_PREFIX}`, serializedCache);

  return response.body.customer;
}
