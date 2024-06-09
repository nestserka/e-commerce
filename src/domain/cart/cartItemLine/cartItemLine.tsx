import style from './_cartItemLine.module.scss';
import iconDelete from '../../../assets/images/icons/icon-delete.svg';

import type { CartItemLineProps } from '../../../utils/types';

export default function CartItemLine({
  imageUrl,
  productName,
  discountedPricePerItem,
  discountLabel,
  pricePerItem,
  quantity,
  totalPrice,
}: CartItemLineProps): JSX.Element {
  return (
    <section className={style['item-line-wrapper']} data-testid="cart-item-line">
      <img src={imageUrl} alt={productName} className={style['product-img']} />
      <div className={style['title-discount-wrapper']}>
        {discountLabel && <div className={style['discount-badge']}>{discountLabel}</div>}
        <h3 className={style.title}>{productName}</h3>
      </div>
      <section className={style['price-wrapper']}>
        <div className={style['current-price-wrapper']}>
          <p className={style['current-price-value']}>{discountedPricePerItem ?? pricePerItem}</p>
        </div>
        {discountedPricePerItem && <p className={style['old-price-value']}>{pricePerItem}</p>}
      </section>
      <section className={style['quantity-input-wrapper']}>
        <button type="button" className={style['quantity-input-control']}>
          –
        </button>
        <p className={style['quantity-number']}>{quantity}</p>
        <button type="button" className={style['quantity-input-control']}>
          +
        </button>
      </section>
      <p className={style['total-price']} title={totalPrice}>
        {totalPrice}
      </p>
      <button type="button" className={style['remove-item-btn']}>
        <img src={iconDelete} alt="Edit" className={style['icon-delete']} />
      </button>
    </section>
  );
}
