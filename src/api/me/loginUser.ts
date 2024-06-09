import { tokenCache } from '../token/MyTokenCache';
import withPasswordFlow from '../middlewareFlows/withPasswordFlow';
import { LS_PREFIX } from '../../constants/constants';

import type { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';

export default async function loginUser(email: string, password: string): Promise<Customer> {
  tokenCache.clear();

  const anonymousCartId = localStorage.getItem(`anonymousCartId-${LS_PREFIX}`) ?? '';

  console.log('loginUser', anonymousCartId);

  const body = {
    email,
    password,
    anonymousCart: { id: anonymousCartId },
    activeCartSignInMode: 'MergeWithExistingCustomerCart',
    updateProductData: true,
  };

  const response: ClientResponse<CustomerSignInResult> = await withPasswordFlow(email, password, tokenCache)
    .me()
    .login()
    .post({
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .execute();

  return response.body.customer;
}
