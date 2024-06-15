import { useState } from 'react';

import { useCartData } from '../../../core/state/cartState';
import { useLoginData } from '../../../core/state/userState';
import LoaderForButton from '../../../components/loaderForButton/LoaderForButton';

import type { PAGES } from '../../../constants/constants';

interface CartToggleButtonProps {
  productId: string | undefined;
  page: keyof typeof PAGES;
}

export default function CartToggleButton({ productId, page }: CartToggleButtonProps): JSX.Element {
  const { customerId } = useLoginData();
  const { activeCart, setCart, addProductToCart, isInCart } = useCartData();
  const [localIsLoading, setLocalIsLoading]= useState<boolean>(false);



  const handleAddToCart = async (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    setLocalIsLoading(true);

    if (!activeCart) {
      try {
        await setCart(customerId);
      } catch (err) {
        console.log((err as Error).message);

        return;
      }
    }

    try {
      if (productId) {
        await addProductToCart(productId, customerId);
      }
    } catch (err) {
      console.log((err as Error).message);
    }finally {
      setLocalIsLoading(false);
    }
  };

  const productInCart = productId ? isInCart(productId) : false;

  return (
    <button
      type="button"
      onClick={(e) => {
        handleAddToCart(e).catch((error: Error) => {
          console.log(error.message);
        });
      }}
      disabled={productInCart}
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
