import withExistingToken from '../token/existingToken';

import type { ClientResponse, Customer } from '@commercetools/platform-sdk';

export default async function getUser(token: string): Promise<Customer> {
  const customer: ClientResponse<Customer> = await withExistingToken(token).me().get().execute();

  return customer.body;
}
