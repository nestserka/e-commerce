import style from './_cartView.module.scss';
import FormSubTitle from '../../../components/formSubTitle/formSubTitle';
import Breadcrumbs from '../../../components/breadCrumbs/breadCrumbs';
import { DYNAMIC_ROUTES } from '../../../constants/constants';
import BackButton from '../../../components/backButton/backButton';
import { useCartData } from '../../../core/state/cartState';
import CartItemLine from '../cartItemLine/cartItemLine';
import { getLineItemProps } from '../../../utils/utils';

const breadCrumbsProps = [
  {
    label: 'Cart',
    route: `${DYNAMIC_ROUTES.CART}`,
  },
];

export default function CartView(): JSX.Element {
  const { itemsInCart } = useCartData();

  return (
    <>
      <Breadcrumbs links={[...breadCrumbsProps]} />
      <header className={style.header}>
        <BackButton />
        <h1 className={style.title}>Shopping Cart</h1>
      </header>

      <div className={style.wrapper}>
        <section className={style['products-list-wrapper']} data-testid="products-list-wrapper">
          <FormSubTitle subTitle="Products" />
          <div className={style['products-wrapper']}>
            {itemsInCart?.map((item) => {
              const cartItemLineProps = getLineItemProps(item);

              // eslint-disable-next-line react/jsx-props-no-spreading
              return <CartItemLine {...cartItemLineProps} />;
            })}
          </div>
        </section>
        <aside className={style['aside-wrapper']}>
          <section className={style['summary-wrapper']}>
            <FormSubTitle subTitle="Summary" />
          </section>
          <section className={style['promocode-wrapper']}>
            <FormSubTitle subTitle="Promocode" />
          </section>
        </aside>
      </div>
    </>
  );
}
