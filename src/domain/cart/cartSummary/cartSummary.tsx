import { useEffect, useState } from 'react';

import FormSubTitle from '../../../components/formSubTitle/formSubTitle';
import { useCartData } from '../../../core/state/cartState';
import { formatPrice } from '../../../utils/utils';
import style from './_cartSummary.module.scss';

export default function CartSummary(): JSX.Element {
  const { activeCart, itemsInCart, getTotalItemsDiscount } = useCartData();
  const [itemsInOrder, setItemsInOrder] = useState<number | undefined>(itemsInCart?.length);

  useEffect(() => {
    if (itemsInCart) {
      setTimeout(() => {
        setItemsInOrder(itemsInCart.reduce((acum, item) => acum + item.quantity, 0));
      }, 0);
    }
  }, [itemsInCart]);

  return (
    <section className={style['summary-wrapper']}>
      <FormSubTitle subTitle="Summary" />
      <div className={style['info-wrapper']}>
        <div className={style['line-info']}>
          <p>Item in Order</p>
          <p>{itemsInOrder ?? 0}</p>
        </div>
        <div className={style['line-info']}>
          <p>Order Price</p>
          <p>{activeCart ? formatPrice(activeCart.totalPrice.centAmount) : 0}</p>
        </div>
        <div className={style['line-info']}>
          <p>Discount</p>
          <p>{activeCart ? `- ${getTotalItemsDiscount().toFixed(2)}` : 0}</p>
        </div>
      </div>
      <div className={style['total-wrapper']}>
        <div className={style['line-info']}>
          <p>Total</p>
          <p>{activeCart ? formatPrice(activeCart.totalPrice.centAmount) : 0}</p>
        </div>
      </div>
    </section>
  );
}
