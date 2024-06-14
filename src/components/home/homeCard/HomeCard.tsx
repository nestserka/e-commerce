import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import style from './_homeCard.module.scss';
import { createParamsfromCard } from '../../cards/card/utils';
import { DYNAMIC_ROUTES } from '../../../constants/constants';
import { useCatalogData } from '../../../core/state/homeState';

import type { PropsCard } from '../../cards/card/types';
import type { ProductProjection } from '@commercetools/platform-sdk';

export function HomeCard({ dataCard }: { dataCard: ProductProjection }): JSX.Element {
  const [product] = useState<PropsCard>(createParamsfromCard(dataCard));
  const { setImages } = useCatalogData();
  const [newCommerceImage, setCommerseImage] = useState<number>();

  useEffect(() => {
    const image = setImages(dataCard.key ?? '');

    if (typeof image === 'number') {
      setCommerseImage(image);
    }
  }, [dataCard.key, setImages]);

  return (
    <Link to={`${DYNAMIC_ROUTES.PRODUCT}${product.cardKey}`} className={style.card}>
      <div className={style['card-pic']}>
        {newCommerceImage ? (
          <img className={style['card-pic-img']} src={product.cardImages[newCommerceImage]} alt={product.cardName} />
        ) : (
          <img className={style['card-pic-img']} src={product.cardImages[0]} alt={product.cardName} />
        )}
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
