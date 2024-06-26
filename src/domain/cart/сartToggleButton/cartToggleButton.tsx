import { useEffect, useState } from 'react';

import { useLoginData } from '../../../core/state/userState';
import LoaderForButton from '../../../components/loaderForButton/LoaderForButton';
import { useBoundStore } from '../../../core/state/boundState';

import type { CartToggleButtonProps } from './types';

export default function CartToggleButton({
  productId,
  page,
  isProductInCartProps = undefined,
}: CartToggleButtonProps): JSX.Element {
  const { customerId } = useLoginData();
  const { activeCart, setCart, addProductToCart, isInCart } = useBoundStore();
  const [localIsLoading, setLocalIsLoading] = useState<boolean>(false);
  const [productInCart, setProductInCart] = useState<boolean>(false);

  const handleAddToCart = async (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    setLocalIsLoading(true);

    if (!activeCart) {
      try {
        await setCart(customerId);
      } catch (err) {
        console.error((err as Error).message);

        return;
      }
    }

    try {
      if (productId) {
        await addProductToCart(productId, customerId);
      }

      setProductInCart(true);
    } catch (err) {
      console.error((err as Error).message);
    } finally {
      setLocalIsLoading(false);
    }
  };

  useEffect((): void => {
    setProductInCart(productId ? isInCart(productId) : false);
  }, [isInCart, productId]);

  return (
    <button
      type="button"
      onClick={(e) => {
        handleAddToCart(e).catch((error: Error) => {
          console.error(error.message);
        });
      }}
      disabled={isProductInCartProps ?? productInCart}
      className={page === 'PRODUCT' ? 'button-primary' : 'button-secondary'}
    >
      {localIsLoading && (
        <div className="wrapper-loader-button">
          <LoaderForButton />
        </div>
      )}
      {productId && isInCart(productId) ? <span>Already in Cart</span> : <span>Add to Cart</span>}
    </button>
  );
}
