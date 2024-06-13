import { useState } from 'react';

import style from './_cartItemLine.module.scss';
import iconDelete from '../../../assets/images/icons/icon-delete.svg';
import { useCartData } from '../../../core/state/cartState';
import { useLoginData } from '../../../core/state/userState';
import { getLineItemsPropsToRemove } from '../../../utils/utils';

import type { ChangeEvent } from 'react';
import type { CartItemLineProps } from '../../../utils/types';

export default function CartItemLine(props: CartItemLineProps): JSX.Element {
  const {
    imageUrl,
    productName,
    discountLabel,
    discountedPricePerItem,
    pricePerItem,
    quantity,
    totalPrice,
    id,
    productId,
  } = props;
  const { customerId } = useLoginData();
  const { addProductToCart, removeProductFromCart } = useCartData();
  const [itemQuantity, setItemQuantity] = useState<number | string>(quantity);
  const [totalItemCost, setTotalItemCost] = useState<string>(totalPrice);
  const incrementPrice = discountedPricePerItem ? discountedPricePerItem.slice(1) : pricePerItem.slice(1);
  const [prevQuantity, setPrevQuantity] = useState<number>(quantity);

  const handleIncrement = async (): Promise<void> => {
    try {
      await addProductToCart(productId, customerId, 1);
      setItemQuantity(Number(itemQuantity) + 1);
      setTotalItemCost(`$${(Number(totalPrice.slice(1)) + Number(incrementPrice)).toFixed(2)}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecrement = async (): Promise<void> => {
    if (Number(itemQuantity) > 1) {
      try {
        const action = getLineItemsPropsToRemove([id], 1);
        await removeProductFromCart(action, customerId);
        setItemQuantity(Number(itemQuantity) - 1);
        setTotalItemCost(`$${(Number(totalPrice.slice(1)) - Number(incrementPrice)).toFixed(2)}`);
      } catch (err) {
        console.log(err);
      }
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
      setItemQuantity(1);
    } else if (value === '0') {
      setItemQuantity(1);
    } else {
      const parsedValue = parseInt(event.target.value, 10);

      if (!Number.isNaN(parsedValue) && parsedValue > 0) {
        setItemQuantity(parsedValue);
      }
    }
  };

  const handleInputBlur = async (event: React.FocusEvent<HTMLInputElement>): Promise<void> => {
    if (event.target instanceof HTMLInputElement && (event.target.value === '' || event.target.value === '0')) {
      setItemQuantity(1);
    } else {
      const parsedValue = parseInt(event.target.value, 10);

      if (!Number.isNaN(parsedValue) && parsedValue > 0) {
        setPrevQuantity(Number(itemQuantity));
        setItemQuantity(parsedValue);
      }

      const diff = Number(itemQuantity) - prevQuantity;
      console.log('diff', diff);

      if (diff > 0) {
        try {
          await addProductToCart(productId, customerId, diff);
          setTotalItemCost(`$${(Number(totalPrice.slice(1)) - Number(incrementPrice)).toFixed(2)}`);
        } catch (err) {
          console.log(err);
        }
      }

      if (diff < 0) {
        try {
          const action = getLineItemsPropsToRemove([id], Math.abs(diff));
          await removeProductFromCart(action, customerId);
          setTotalItemCost(`$${(Number(totalPrice.slice(1)) - Number(incrementPrice)).toFixed(2)}`);
        } catch (err) {
          console.log(err);
        }
      }
    }

    console.log(prevQuantity, itemQuantity);

    setTotalItemCost(`$${(Number(itemQuantity) * Number(incrementPrice)).toFixed(2)}`);
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
          value={itemQuantity === 0 ? '' : itemQuantity}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={style['quantity-input']}
        />
        <button type="button" className={style['quantity-input-control']} onClick={handleIncrement}>
          +
        </button>
      </section>
      <p className={style['total-price']} title={totalItemCost}>
        {totalItemCost}
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
