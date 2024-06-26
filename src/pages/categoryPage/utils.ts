import type { OptionsFromSelect } from './types';
import type {
  AttributeDefinition,
  AttributeLocalizedEnumType,
  Category,
  ProductType,
} from '@commercetools/platform-sdk';

export function getSubCategory(allCategories: Category[], nameCategory: string): OptionsFromSelect[] {
  const dataCategory = allCategories.find((category: Category) => category.slug.en === nameCategory);

  if (dataCategory) {
    const categoryWithAncestors = allCategories.filter(
      (data: Category) => data.ancestors.length && data.ancestors[0].id === dataCategory.id,
    );
    const optionsForSelect: OptionsFromSelect[] = [];
    categoryWithAncestors.forEach((category: Category) => {
      const option: OptionsFromSelect = {
        value: category.id,
        label: category.name.en,
        key: category.slug.en,
      };
      optionsForSelect.push(option);
    });

    return optionsForSelect;
  }

  return [];
}

export function getAttributesCategory(allProductTypes: ProductType[], nameCategory: string): AttributeDefinition[] {
  const dataProductTypes = allProductTypes.find((productType: ProductType) => productType.key === nameCategory);

  const arrAttribute = dataProductTypes?.attributes?.filter(
    (attribute) => attribute.name !== 'discount' && attribute.name !== 'bestseller',
  );

  return arrAttribute ?? [];
}

export function isAttributeLocalizedEnumType(value: unknown): value is AttributeLocalizedEnumType {
  return typeof value === 'object' && value !== null && 'name' in value && value.name === 'lenum';
}

export function createCategoriesList(categoriesData: Category[]): OptionsFromSelect[] {
  const optionsForSelect: OptionsFromSelect[] = [];
  categoriesData.forEach((category: Category) => {
    if (!category.ancestors.length) {
      const option: OptionsFromSelect = {
        value: category.slug.en,
        label: category.name.en,
        key: category.id,
      };
      optionsForSelect.push(option);
    }
  });

  return optionsForSelect;
}

export const generateUniqueId = (): string => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
