import withClientCredentialsFlow from '../middlewareFlows/withClientCredentials';

import type { QueryArgs } from '../../utils/types';
import type { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

export default async function getHomeProductList(queryArgs: QueryArgs): Promise<ProductProjectionPagedSearchResponse> {
  const productsList = await withClientCredentialsFlow()
    .productProjections()
    .search()
    .get({
      queryArgs,
    })
    .execute();

  return productsList.body;
}
