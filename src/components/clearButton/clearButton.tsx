import style from './_clearButton.module.scss';
import removeIcon from '../../assets/images/icons/icon-delete.svg';
// import { useCartData } from '../../core/state/cartState';
// import { getLineItemsPropsToRemove } from '../../utils/utils';
// import { useLoginData } from '../../core/state/userState';

interface ClearButtonProps {
  onClick: () => void;
}

export default function ClearButton({ onClick }: ClearButtonProps): JSX.Element {
  // const { getItemsIds, removeProductFromCart } = useCartData();
  // const { customerId } = useLoginData();

  // const handleClick = async (): Promise<void> => {
  //   const id = getItemsIds();

  //   if (id) {
  //     const actionProps = getLineItemsPropsToRemove(id);

  //     await removeProductFromCart(actionProps, customerId);
  //   }
  // };

  return (
    <button onClick={onClick} type="button" className={`${style['clear-button']} button-secondary`}>
      <span>Clear all</span>
      <img src={removeIcon} alt="" className={style.icon} />
    </button>
  );
}
