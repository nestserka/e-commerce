import withClientCredentialsFlow from '../middlewareFlows/withClientCredentials';
import loginUser from '../me/loginUser';

import type { Customer, CustomerDraft } from '@commercetools/platform-sdk';

export default async function createCustomer(data: CustomerDraft): Promise<Customer> {
  const response = await withClientCredentialsFlow()
    .customers()
    .post({
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .execute();
  console.log(data.password);

  if (data.password) {
    await loginUser(response.body.customer.email, data.password);
  }

  return response.body.customer;
}
