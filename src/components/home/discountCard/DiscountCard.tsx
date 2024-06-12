import { useState } from 'react';
import { Link } from 'react-router-dom';

import style from './_discountCard.module.scss';
import { createParamsfromCard } from '../../cards/card/utils';
import { DYNAMIC_ROUTES } from '../../../constants/constants';

import type { PropsCard } from '../../cards/card/types';
import type { ProductProjection } from '@commercetools/platform-sdk';

export function DiscountCard({ dataCard }: { dataCard: ProductProjection }): JSX.Element {
  const [product] = useState<PropsCard>(createParamsfromCard(dataCard));

  return (
    <Link to={`${DYNAMIC_ROUTES.PRODUCT}${product.cardKey}`} className={style.card}>
      <div className={style['card-pic']}>
      <img className={style['card-pic-img']} src={product.cardImages[0]} alt={product.cardName} />
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
