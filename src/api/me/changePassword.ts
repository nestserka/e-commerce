import withExistingToken from '../token/existingToken';

import type { ClientResponse, Customer, MyCustomerChangePassword } from '@commercetools/platform-sdk';

export default async function updateCustomerPassword(data: MyCustomerChangePassword): Promise<Customer> {
  const currentToken = localStorage.getItem('token');
  const parsenToken = currentToken ?? '';

  const response: ClientResponse<Customer> = await withExistingToken(parsenToken)
    .me()
    .password()
    .post({
      body: data,
    })
    .execute();

  return response.body;
}
