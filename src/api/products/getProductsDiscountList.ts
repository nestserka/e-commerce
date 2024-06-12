import withClientCredentialsFlow from '../middlewareFlows/withClientCredentials';

import type { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

export default async function getProductsDiscountList(): Promise<ProductProjectionPagedSearchResponse> {
  const productsList = await withClientCredentialsFlow()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        'filter.query': [`variants.attributes.discount.key: "10%-off", "15%-off", "20%-off"`],
      },
    })
    .execute();

  return productsList.body;
}
