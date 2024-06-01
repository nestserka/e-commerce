import type { Category } from '@commercetools/platform-sdk';

export function getSubCategory(allCategories: Category[], nameCategory: string): Category[] {
  const dataCategory = allCategories.find((data: Category) => data.slug.en === nameCategory);

  if (dataCategory) {
    const categoryWithAncestors = allCategories.filter(
      (data: Category) => data.ancestors.length && data.ancestors[0].id === dataCategory.id,
    );

    return categoryWithAncestors;
  }

  return [];
}
