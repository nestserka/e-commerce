import withRefreshToken from '../middlewareFlows/withRefreshToken';
import { tokenCache } from '../token/MyTokenCache';

import type { Address, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

export default async function createNewAddress(
  version: number,
  addressType: string,
  data: Address,
  isDefault: boolean,
): Promise<Customer> {
  const accessToken = tokenCache.get().refreshToken;
  const body: MyCustomerUpdateAction[] = [
    {
      action: 'addAddress',
      address: data,
    },
  ];

  const response = await withRefreshToken(accessToken ?? '')
    .me()
    .post({
      body: {
        version,
        actions: body,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .execute();
  const { addresses } = response.body;
  const lastAddressId = addresses[addresses.length - 1].id;
  const addAddressTypeById: MyCustomerUpdateAction[] = [
    {
      action: addressType === 'shipping' ? 'addShippingAddressId' : 'addBillingAddressId',
      addressId: lastAddressId,
    },
  ];

  if (isDefault) {
    addAddressTypeById.push({
      action: addressType === 'shipping' ? 'setDefaultShippingAddress' : 'setDefaultBillingAddress',
      addressId: lastAddressId,
    });
  }

  const resp = await withRefreshToken(accessToken ?? '')
    .me()
    .post({
      body: {
        version: response.body.version,
        actions: addAddressTypeById,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .execute();

  return resp.body;
}
