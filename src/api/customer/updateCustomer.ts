import withExistingToken from '../token/existingToken';

import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

export default async function updateCustomer(version: number, data: MyCustomerUpdateAction[]): Promise<Customer> {
  const currentToken = localStorage.getItem('token');
  const parsenToken = currentToken ?? '';

  const response = await withExistingToken(parsenToken)
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
