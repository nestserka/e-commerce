import { useState } from 'react';
import { Link } from 'react-router-dom';

import style from './card.module.scss';
import { createParamsfromCard } from './utils';

import type { PropsCard } from './types';
import type { ProductProjection } from '@commercetools/platform-sdk';

function Card({ dataCard }: { dataCard: ProductProjection }): JSX.Element {
  const [product] = useState<PropsCard>(createParamsfromCard(dataCard));

  return (
    <Link to={product.cardKey} className={style.card}>
      <div className={style['card-pic']}>
        <div className={style['information-block']}>
          {product.discountedName && <span className={style['discount-name']}>{product.discountedName.label}</span>}
          {product.isCardBestseller && <span className={style.bestseller}>BESTSELLER</span>}
        </div>
        <img className={style['card-pic-img']} src={product.cardImages[0]} alt="" />
      </div>

      <div className={style['card-info-wrapper']}>
        <h2 className={style['card-title']} id={product.cardName} title={product.cardName}>
          {product.cardName}
        </h2>
        <div className={style['card-description']}>{product.cardDescription}</div>
        <div className={style['block-buy']}>
          <button type="button" className={style['card-button']}>
            View Details
          </button>
          <div className={style['block-price']}>
            <span className={style.price}>{product.cardPrice}</span>
            <span className={style.discount}>{product.cardDiscounted}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
