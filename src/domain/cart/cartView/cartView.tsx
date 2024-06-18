import { useState } from 'react';

import style from './_cartView.module.scss';
import FormSubTitle from '../../../components/formSubTitle/formSubTitle';
import BackButton from '../../../components/backButton/backButton';
import { useCartData } from '../../../core/state/cartState';
import CartItemLine from '../cartItemLine/cartItemLine';
import { getLineItemProps, getLineItemsPropsToRemove } from '../../../utils/utils';
import EmptyCartState from '../emptyCartView/emptyCartState';
import ClearButton from '../../../components/clearButton/clearButton';
import CartSummary from '../cartSummary/cartSummary';
import Promocode from '../promocode/promocode';
import ModalClearCart from '../modalClearCart/modalClearCart';
import { useLoginData } from '../../../core/state/userState';
import { generateUniqueId } from '../../../pages/categoryPage/utils';

const dateNow = new Date();

const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
const formattedDate = dateNow.toLocaleDateString('en-US', options);

export default function CartView(): JSX.Element {
  const { itemsInCart } = useCartData();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const { getItemsIds, removeProductFromCart } = useCartData();
  const { customerId } = useLoginData();

  const clearCart = async (): Promise<void> => {
    const id = getItemsIds();

    if (id) {
      const actionProps = getLineItemsPropsToRemove(id);

      await removeProductFromCart(actionProps, customerId).then(() => {
        setIsModalShown(false);
      });
    }
  };

  const cancelAndCloseModal = (): void => {
    setIsModalShown(false);
  };

  return (
    <>
      {isModalShown && <ModalClearCart onConfirm={clearCart} onCancel={cancelAndCloseModal} />}
      <BackButton />
      <h1 className={style.title}>Shopping Cart</h1>

      {!itemsInCart || itemsInCart.length === 0 ? (
        <EmptyCartState />
      ) : (
        <div className={style.wrapper}>
          <section className={style['products-list-wrapper']} data-testid="products-list-wrapper">
            <FormSubTitle subTitle="Products" />
            <div className={style['products-wrapper']}>
              {itemsInCart.map((item) => {
                const cartItemLineProps = getLineItemProps(item);

                return <CartItemLine key={item.id} productData={cartItemLineProps} />;
              })}
            </div>
            <div className={style['clear-all-wrapper']}>
              <div className={style['date-wrapper']}>
                <span>Nearest shipping date</span> <span className={style.date}>{formattedDate}</span>
              </div>
              <ClearButton
                onClick={() => {
                  setIsModalShown(true);
                }}
              />
            </div>
          </section>
          <aside className={style['aside-wrapper']}>
            <CartSummary />
            <section className={style['promocode-wrapper']}>
              <FormSubTitle subTitle="Promocode" />
              <Promocode />
            </section>
          </aside>
        </div>
      )}
    </>
  );
}
