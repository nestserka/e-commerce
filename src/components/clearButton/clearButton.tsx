import style from './_clearButton.module.scss';
import removeIcon from '../../assets/images/icons/icon-delete.svg';
import { useCartData } from '../../core/state/cartState';
import { getLineItemsPropsToRemove } from '../../utils/utils';
import { useLoginData } from '../../core/state/userState';

export default function ClearButton(): JSX.Element {
  const { getItemsIds, removeProductFromCart } = useCartData();
  const { customerId } = useLoginData();

  const handleClick = async (): Promise<void> => {
    const id = getItemsIds();

    if (id) {
      const actionProps = getLineItemsPropsToRemove(id);

      await removeProductFromCart(actionProps, customerId);
    }
  };

  return (
    <button onClick={handleClick} type="button" className={`${style['clear-button']} button-secondary`}>
      <span>Clear all</span>
      <img src={removeIcon} alt="" className={style.icon} />
    </button>
  );
}
