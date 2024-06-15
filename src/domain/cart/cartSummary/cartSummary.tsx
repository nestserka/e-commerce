import { useEffect, useState } from 'react';

import FormSubTitle from '../../../components/formSubTitle/formSubTitle';
import { useCartData } from '../../../core/state/cartState';
import { formatPrice } from '../../../utils/utils';
import style from './_cartSummary.module.scss';

export default function CartSummary(): JSX.Element {
  const { activeCart, itemsInCart, getTotalItemsDiscount, isPromocodeApplied } = useCartData();
  const [itemsInOrder, setItemsInOrder] = useState<number | undefined>(itemsInCart?.length);
  const [promocodeDiscount, setPromocodeDiscount] = useState<string>('0');
  const [totalPriceBeforePromocode, setTotalPriceBeforePromocode] = useState<string>('');

  useEffect(() => {
    if (itemsInCart) {
      setItemsInOrder(itemsInCart.reduce((acum, item) => acum + item.quantity, 0));
    }

    if (activeCart && isPromocodeApplied) {
      const value = activeCart.discountOnTotalPrice?.discountedAmount.centAmount;
      const totalPrice = activeCart.totalPrice.centAmount;

      if (value) {
        const totalPriceBeforePromocodeNum = value + totalPrice;

        const promocodeDiscountValue = (value / 100).toFixed(2);
        setPromocodeDiscount(promocodeDiscountValue);

        const totalPriceBeforePromocodeValue = (totalPriceBeforePromocodeNum / 100).toFixed(2);
        setTotalPriceBeforePromocode(totalPriceBeforePromocodeValue);
      }
    }
  }, [itemsInCart, activeCart, isPromocodeApplied, setPromocodeDiscount, setTotalPriceBeforePromocode]);

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
          <p>
            {activeCart && !isPromocodeApplied
              ? formatPrice(activeCart.totalPrice.centAmount)
              : `$${totalPriceBeforePromocode}`}
          </p>
        </div>
        {getTotalItemsDiscount() !== 0 && (
          <div className={style['line-info']}>
            <p>Applied Discount</p>
            <p>{activeCart ? `- $${getTotalItemsDiscount().toFixed(2)}` : 0}</p>
          </div>
        )}
        {isPromocodeApplied && (
          <div className={style['line-info']}>
            <p>Promocode</p>
            <p>{`- $${promocodeDiscount}`}</p>
          </div>
        )}
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
