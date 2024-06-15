import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './_card.module.scss';
import { createParamsFromCard } from './utils';
import { DYNAMIC_ROUTES } from '../../../constants/constants';
import CartToggleButton from '../../cart/сartToggleButton/cartToggleButton';
import { useCatalogCheckAttributeState, useCatalogData } from '../../../core/state/catalogState';

import type { PAGES } from '../../../constants/constants';
import type { PropsCard } from './types';
import type { ProductProjection } from '@commercetools/platform-sdk';

function Card({ dataCard }: { dataCard: ProductProjection }): JSX.Element {
  const [product] = useState<PropsCard>(createParamsFromCard(dataCard));
  const currentPage: keyof typeof PAGES = 'CATALOG';
  const { resetAttributes, resetSort } = useCatalogData();
  const { resetAttributesList, resetCheckedStatesAttributesList } = useCatalogCheckAttributeState();

  return (
    <Link
      to={`${DYNAMIC_ROUTES.PRODUCT}${product.cardKey}`}
      onClick={() => {
        resetAttributes();
        resetSort();
        resetAttributesList();
        resetCheckedStatesAttributesList();
      }}
      className={styles.card}
    >
      <div className={styles['card-pic']}>
        <div className={styles['information-block']}>
          {product.discountedName && <span className={styles['discount-name']}>{product.discountedName.label}</span>}
          {product.isCardBestseller && <span className={styles.bestseller}>BESTSELLER</span>}
        </div>
        <img className={styles['card-pic-img']} src={product.cardImages[0]} alt={product.cardName} />
      </div>

      <div className={styles['card-info-wrapper']}>
        <h2 className={styles['card-title']} id={product.cardName} title={product.cardName}>
          {product.cardName}
        </h2>
        <div className={styles['card-description']}>{product.cardDescription}</div>
        <div className={styles['block-buy']}>
          <CartToggleButton productId={dataCard.id} page={currentPage} />
          <div className={styles['block-price']}>
            <span className={styles.price}>{product.cardDiscounted}</span>
            <span className={product.cardDiscounted ? styles.discount : styles.price}>{product.cardPrice}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
