import LoaderForButton from '../../../components/loaderForButton/LoaderForButton';
import { useBoundStore } from '../../../core/state/boundState';
import { useLoginData } from '../../../core/state/userState';
import { getLineItemsPropsToRemove } from '../../../utils/utils';

import type { CartRemoveButtonProps } from './types';

export default function CartRemoveButton({
  productId,
  id,
  setIsShow,
  setIdProductCart,
  setProductInCart,
}: CartRemoveButtonProps): JSX.Element {
  const { customerId } = useLoginData();
  const { activeCart, setCart, removeProductFromCart, isLoading } = useBoundStore();

  const handleRemoveClick = async (): Promise<void> => {
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
        const action = getLineItemsPropsToRemove([id]);
        await removeProductFromCart(action, customerId);
      }
    } catch (err) {
      console.error('Failed to remove product from the cart', err);
    }
  };

  return (
    <button
      type="button"
      onClick={() => {
        handleRemoveClick()
          .then(() => {
            setIsShow(true);
            setIdProductCart(null);
            setProductInCart(false);
          })
          .catch((error: Error) => {
            console.error(error.message);
          })
          .finally(() => {
            setTimeout(() => {
              setIsShow(false);
            }, 3000);
          });
      }}
      className="button-primary"
    >
      {isLoading && (
        <div className="wrapper-loader-button">
          <LoaderForButton />
        </div>
      )}
      <span>Delete in Cart</span>
    </button>
  );
}
