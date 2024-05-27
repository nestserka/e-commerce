import { api } from './Api';

import type { Category } from '@commercetools/platform-sdk';

export default class ProductList {
  public static async getAllCategories(): Promise<Category[]> {
    const response = await api.root().categories().get().execute();
    const onlyWithoutAncestors = response.body.results.filter((data) => data.ancestors.length === 0);

    return onlyWithoutAncestors;
  }
}
