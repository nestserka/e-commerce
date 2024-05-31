import MyTokenCache from '../token/MyTokenCache';
import withPasswordFlow from '../middlewareFlows/withPasswordFlow';

import type { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';

export default async function loginUser(email: string, password: string): Promise<Customer> {
  const tokenCache = new MyTokenCache();

  // const tokenAnon: string | null = localStorage.getItem('tokenAnon');

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

  const { token } = tokenCache.get();
  console.log(token);

  if (token) localStorage.setItem('token', token);

  return response.body.customer;
}
