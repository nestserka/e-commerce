import { useState } from 'react';

import style from './_cartItemLine.module.scss';
import iconDelete from '../../../assets/images/icons/icon-delete.svg';
import { useCartData } from '../../../core/state/cartState';
import { useLoginData } from '../../../core/state/userState';
import { getLineItemsPropsToRemove } from '../../../utils/utils';

import type { ChangeEvent } from 'react';
import type { CartItemLineProps } from '../../../utils/types';

export default function CartItemLine(props: CartItemLineProps): JSX.Element {
  const { imageUrl, productName, discountLabel, discountedPricePerItem, pricePerItem, quantity, totalPrice, id } =
    props;
  const { customerId } = useLoginData();
  const { removeProductFromCart } = useCartData();
  const [itemQuantity, setItemQuantity] = useState<number | string>(quantity);

  const handleIncrement = (): void => {
    setItemQuantity(Number(itemQuantity) + 1);
  };

  const handleDecrement = (): void => {
    if (Number(itemQuantity) > 1) {
      setItemQuantity(Number(itemQuantity) - 1);
    }
  };

  const handleRemoveClick = async (): Promise<void> => {
    try {
      const action = getLineItemsPropsToRemove([id]);
      await removeProductFromCart(action, customerId);
    } catch (err) {
      console.log('Failed to remove product from the cart', err);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    if (value === '') {
      setItemQuantity('');
    } else if (value === '0') {
      setItemQuantity(0);
    } else {
      const parsedValue = parseInt(value, 10);

      if (!Number.isNaN(parsedValue) && parsedValue > 0) {
        setItemQuantity(parsedValue);
      }
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (event.target instanceof HTMLInputElement && (event.target.value === '' || event.target.value === '0')) {
      setItemQuantity(1);
    }
  };

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
        <button type="button" className={style['quantity-input-control']} onClick={handleDecrement}>
          –
        </button>
        <input
          type="text"
          value={itemQuantity}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={style['quantity-input']}
        />
        <button type="button" className={style['quantity-input-control']} onClick={handleIncrement}>
          +
        </button>
      </section>
      <p className={style['total-price']} title={totalPrice}>
        {totalPrice}
      </p>
      <button
        type="button"
        className={style['remove-item-btn']}
        aria-label="Remove product from cart"
        onClick={handleRemoveClick}
      >
        <img src={iconDelete} alt="Edit" className={style['icon-delete']} />
      </button>
    </section>
  );
}
