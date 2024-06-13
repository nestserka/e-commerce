import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import style from './_discountCard.module.scss';
import { createParamsfromCard } from '../../cards/card/utils';
import { DYNAMIC_ROUTES } from '../../../constants/constants';
import { useCatalogData } from '../../../core/state/homeState';

import type { PropsCard } from '../../cards/card/types';
import type { ProductProjection } from '@commercetools/platform-sdk';

export function DiscountCard({ dataCard }: { dataCard: ProductProjection }): JSX.Element {
  const [product] = useState<PropsCard>(createParamsfromCard(dataCard));
  const { setImages, setCategory } = useCatalogData();
  const [newImage, setNewImage] = useState<string>();
  const [newCommerceImage, setCommerseImage] = useState<number>();
  const [category, setCategoryOfProduct] = useState<string>();

  useEffect(() => {
    const image = setImages(dataCard.key ?? '');

    if (typeof image === 'string') {
      setNewImage(image);
    } else if (typeof image === 'number') {
      setCommerseImage(image);
    }

    const categoryName = setCategory(dataCard.categories[0].id);
    setCategoryOfProduct(categoryName);
  }, [dataCard.key, setImages, setCategory, dataCard.categories]);

  return (
    <Link to={`${DYNAMIC_ROUTES.PRODUCT}${product.cardKey}`} className={style.card}>
      <div className={style['card-pic']}>
        {newImage && <img className={style['card-pic-img']} src={newImage} alt={product.cardName} />}
        {!newImage && newCommerceImage && (
          <img className={style['card-pic-img']} src={product.cardImages[newCommerceImage]} alt={product.cardName} />
        )}
        {!newImage && !newCommerceImage && (
          <img className={style['card-pic-img']} src={product.cardImages[0]} alt={product.cardName} />
        )}
        <p className={style.category}>{category}</p>
      </div>

      <h2 className={style['card-title']} id={product.cardName} title={product.cardName}>
        {product.cardName}
      </h2>
      <div className={style['block-price']}>
        <span className={style.price}>{product.cardDiscounted}</span>
        <span className={product.cardDiscounted ? style.discount : style.price}>{product.cardPrice}</span>
      </div>
    </Link>
  );
}
