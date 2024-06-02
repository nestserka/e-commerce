import type { AttributeDefinition, Category, ProductType } from '@commercetools/platform-sdk';

export function getSubCategory(allCategories: Category[], nameCategory: string): Category[] {
  const dataCategory = allCategories.find((category: Category) => category.slug.en === nameCategory);

  if (dataCategory) {
    const categoryWithAncestors = allCategories.filter(
      (data: Category) => data.ancestors.length && data.ancestors[0].id === dataCategory.id,
    );

    return categoryWithAncestors;
  }

  return [];
}

export function getAttributesCategory(allProductTypes: ProductType[], nameCategory: string): AttributeDefinition[] {
  const dataProductTypes = allProductTypes.find((productType: ProductType) => productType.key === nameCategory);

  return dataProductTypes?.attributes ? dataProductTypes.attributes : [];
}
