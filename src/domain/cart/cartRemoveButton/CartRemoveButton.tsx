import LoaderForButton from '../../../components/loaderForButton/LoaderForButton';
import { useCartData } from '../../../core/state/cartState';
import { useLoginData } from '../../../core/state/userState';
import { getLineItemsPropsToRemove } from '../../../utils/utils';

export interface CartRemoveButtonProps {
  productId: string;
  id: string;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setProductInCart: React.Dispatch<React.SetStateAction<boolean>>;
  setIdProductCart: React.Dispatch<React.SetStateAction<string | null>>;

}

export default function CartRemoveButton({
  productId,
  id,
  setIsShow,
  setIdProductCart,
  setProductInCart
}: CartRemoveButtonProps): JSX.Element {
  const { customerId } = useLoginData();
  const { activeCart, setCart, removeProductFromCart, isLoading } = useCartData();

  const handleRemoveClick = async (): Promise<void> => {
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
        const action = getLineItemsPropsToRemove([id]);
        await removeProductFromCart(action, customerId);
      }
    } catch (err) {
      console.log('Failed to remove product from the cart', err);
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
            console.log(error.message);
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
