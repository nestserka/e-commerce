import imageForCard from '../../../assets/images/card/2d4d9c82621446798b761cf3c957865b.jpg';

import type { Attribute, Image, ProductProjection } from '@commercetools/platform-sdk';
import type { DataDiscountedName, PropsCard } from './types';

export function createParamsfromCard(params: ProductProjection): PropsCard {
  const cardImages: string[] = params.masterVariant.images?.length
    ? params.masterVariant.images.map((image: Image) => image.url)
    : [imageForCard];
  const lackOfDescription: string = 'Product information will be available at a later date';

  const discountedNameData: DataDiscountedName | undefined = params.masterVariant.attributes?.find(
    (attribute: DataDiscountedName) => attribute.name === 'discount',
  );
  const bestseller: Attribute | undefined = params.masterVariant.attributes?.find(
    (attribute: Attribute) => attribute.name === 'bestseller',
  );

  return {
    cardName: params.name.en,
    cardDescription: params.metaDescription ? params.metaDescription.en : lackOfDescription,
    cardImages,
    cardPrice: params.masterVariant.prices
      ? `$ ${(Number(params.masterVariant.prices[0].value.centAmount) / 100).toFixed(2)}`
      : '',
    cardDiscounted: params.masterVariant.prices?.[0].discounted
      ? `$ ${(Number(params.masterVariant.prices[0].discounted.value.centAmount) / 100).toFixed(2)}`
      : '',
    discountedName: discountedNameData?.value[0],
    isCardBestseller: !!bestseller,
    cardKey: params.key ? params.key : 'no_found_product',
  };
}
