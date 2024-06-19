import style from './_cart.module.scss';
import CartView from '../../domain/cart/cartView/cartView';
import { useBoundStore } from '../../core/state/boundState';



export default function CartPage(): JSX.Element {
  const { activeCart, itemsInCart } = useBoundStore();


  return (
    <section className={style.cart} data-testid="cart">
      {activeCart && <CartView />}
      {activeCart && !itemsInCart && <span>Cart is empty</span>}
    </section>
  );
}
