import type {
  Category,
  ClientResponse,
  ProductProjectionPagedSearchResponse,
  ProductType,
} from '@commercetools/platform-sdk';
import withClientCredentialsFlow from './middlewareFlows/withClientCredentials';

export default class ProductList {
  public static async getAllCategories(): Promise<Category[]> {
    const response = await withClientCredentialsFlow().categories().get().execute();
    const onlyWithoutAncestors = response.body.results.filter((data: Category) => data.ancestors.length === 0);

    return onlyWithoutAncestors;
  }

  public static async getOneCategory(category: string): Promise<Category[] | undefined> {
    const response = await withClientCredentialsFlow().categories().get().execute();
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
    const byCategoryKey = await withClientCredentialsFlow()
      .categories()
      .withKey({ key: `${category}` })
      .get()
      .execute();

    return byCategoryKey;
  }

  public static async filterByAttributes(
    // colour: string,
    subtrees: string,
    // size: string,
    // bestseller: string,
    // sale: string,
    // brand: string,
    // sortpricename: string | string[],
    // search: string,
    // priceRangeStart: string,
    // priceRangeFinish: string,
    // limit: number,
    // offset: number,
    // winter: string,
    // fuzzylevel?: number
  ): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    try {
      const productsList = await withClientCredentialsFlow()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            // sort: sortpricename,
            // limit: Number(`${limit}`),
            limit: 100,
            // 'text.en-us': `${search}`,
            // fuzzy: true,
            // fuzzyLevel: Number(`${fuzzylevel}`),
            // offset: Number(`${limit}`) * Number(`${offset}`),
            'filter.query': [
              `categories.id: ${subtrees}`,
              // `variants.attributes.color.key:${colour}`,
              // `variants.attributes.size.key:${size}`,
              // `variants.attributes.bestseller:${bestseller}`,
              // `variants.attributes.sale:${sale}`,
              // `variants.attributes.winter:${winter}`,
              // `variants.attributes.brand.key:${brand}`,
              // `variants.price.centAmount:range (${priceRangeStart} to ${priceRangeFinish})`,
            ],
          },
        })
        .execute();

      return productsList;
    } catch {
      throw new Error('no product by attribute or filter found');
    }
  }

  public static async getProductTypeSizeAttribute(key: string): Promise<ClientResponse<ProductType>> {
    try {
      const productType = await withClientCredentialsFlow().productTypes().withKey({ key }).get().execute();

      return productType;
    } catch {
      throw new Error('no product type size attribute found');
    }
  }
}
