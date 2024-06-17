import { useEffect, useState } from 'react';

import style from './_cartItemLine.module.scss';
import iconDelete from '../../../assets/images/icons/icon-delete.svg';
import { useCartData } from '../../../core/state/cartState';
import { useLoginData } from '../../../core/state/userState';
import { getLineItemsPropsToRemove } from '../../../utils/utils';
import { useDebounce } from '../../../utils/useDebounce';
import ErrorMessage from '../../../components/errorMessage/ErrorMessage';

import type { CartItemLineProps } from '../../../utils/types';
import type { ChangeEvent } from 'react';

export default function CartItemLine({ productData }: CartItemLineProps): JSX.Element {
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
  } = productData;
  const { customerId } = useLoginData();
  const { addProductToCart, removeProductFromCart } = useCartData();
  const [itemQuantity, setItemQuantity] = useState<number | string>(quantity);
  const [totalItemCost, setTotalItemCost] = useState<string>(totalPrice);
  const incrementPrice = discountedPricePerItem ? discountedPricePerItem.slice(1) : pricePerItem.slice(1);
  const [prevQuantity, setPrevQuantity] = useState<number>(quantity);
  const [error, setError] = useState<string>('');

  const debouncedItemQuantity = useDebounce(itemQuantity);

  useEffect(() => {
    const updateCart = async (): Promise<void> => {
      const diff = Number(debouncedItemQuantity) - prevQuantity;

      try {
        if (diff > 0) {
          await addProductToCart(productId, customerId, diff);
        } else if (diff < 0) {
          const action = getLineItemsPropsToRemove([id], Math.abs(diff));
          await removeProductFromCart(action, customerId);
        }

        setPrevQuantity(Number(debouncedItemQuantity));
        setTotalItemCost(`$${(Number(debouncedItemQuantity) * Number(incrementPrice)).toFixed(2)}`);
      } catch (err) {
        console.log('failed to modify item quantity', err);
      }
    };

    updateCart().catch((err) => {
      console.log(err);
    });
  }, [
    debouncedItemQuantity,
    addProductToCart,
    customerId,
    id,
    incrementPrice,
    prevQuantity,
    productId,
    removeProductFromCart,
  ]);

  const handleIncrement = (): void => {
    setItemQuantity(Number(itemQuantity) + 1);
    setTotalItemCost(`$${(Number(totalPrice.slice(1)) + Number(incrementPrice)).toFixed(2)}`);
  };

  const handleDecrement = (): void => {
    if (Number(itemQuantity) > 1) {
      setItemQuantity(Number(itemQuantity) - 1);
      setTotalItemCost(`$${(Number(totalPrice.slice(1)) - Number(incrementPrice)).toFixed(2)}`);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    if (value === '' || value === '0') {
      setItemQuantity(1);
    }

    const parsedValue = parseInt(value, 10);

    if (!Number.isNaN(parsedValue) && parsedValue > 0 && parsedValue < 1001) {
      setItemQuantity(parsedValue);
      setError('');
    } else if (!Number.isNaN(parsedValue) && parsedValue > 0 && parsedValue > 1000) {
      setError('Item quantity should be less than one thousand items');
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

  const handleInputBlur = (): void => {
    if (itemQuantity === '' || itemQuantity === '0') {
      setItemQuantity(1);
    } else {
      const parsedValue = parseInt(String(itemQuantity), 10);

      if (!Number.isNaN(parsedValue) && parsedValue > 0) {
        setItemQuantity(parsedValue);
      }
    }
  };

  return (
    <div className={style.wrapper}>
      <section className={style['item-line-wrapper']} data-testid="cart-item-line">
        <div className={style['left-aside']}>
          <img src={imageUrl} alt={productName} className={style['product-img']} />
          <div className={style['title-discount-wrapper']}>
            {discountLabel && <div className={style['discount-badge']}>{discountLabel}</div>}
            <h3 className={style.title}>{productName}</h3>
          </div>
        </div>
        <div className={style['right-aside']}>
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
        </div>
      </section>

      {error && <ErrorMessage message={error} />}
    </div>
  );
}
