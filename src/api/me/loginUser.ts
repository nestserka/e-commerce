import { tokenCache } from '../token/MyTokenCache';
import { LS_PREFIX } from '../../constants/constants';
import withRefreshToken from '../middlewareFlows/withRefreshToken';
import withPasswordFlow from '../middlewareFlows/withPasswordFlow';

import type { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';

export default async function loginUser(email: string, password: string): Promise<Customer> {
  // tokenCache.clear();

  const anonymousCartId = localStorage.getItem(`anonymousCartId-${LS_PREFIX}`) ?? '';

  const body = {
    email,
    password,
    activeCartSignInMode: 'MergeWithExistingCustomerCart',
    updateProductData: true,
  };

  if (anonymousCartId) {
    await withRefreshToken(tokenCache.get().refreshToken ?? '')
      .me()
      .login()
      .post({
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();
  }

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

  return response.body.customer;
}
