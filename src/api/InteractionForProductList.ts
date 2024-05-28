import { api } from './Api';

import type { Category, ClientResponse } from '@commercetools/platform-sdk';

export default class ProductList {
  public static async getAllCategories(): Promise<Category[]> {
    const response = await api.root().categories().get().execute();
    const onlyWithoutAncestors = response.body.results.filter((data: Category) => data.ancestors.length === 0);

    return onlyWithoutAncestors;
  }

  public static async getOneCategory(category: string): Promise<Category[] | undefined> {
    const response = await api.root().categories().get().execute();
    const dataCategory = response.body.results.find((data: Category) => data.slug.en === category);

    if (dataCategory) {
      const onlyWithoutAncestors = response.body.results.filter(
        (data: Category) => data.ancestors.length && data.ancestors[0].id === dataCategory.id,
      );

      return onlyWithoutAncestors;
    }

    return undefined;
  }

  public static async returnProductsByCategoryKey(category: string): Promise<ClientResponse<Category>> {
    const byCategoryKey = await api
      .root()
      .categories()
      .withKey({ key: `${category}` })
      .get()
      .execute();

    return byCategoryKey;
  }
}
