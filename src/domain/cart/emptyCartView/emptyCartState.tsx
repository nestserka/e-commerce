import { Link } from 'react-router-dom';

import style from './_emptyCartState.module.scss';
import { ROUTES } from '../../../constants/constants';

export default function EmptyCartState(): JSX.Element {
  return (
    <section className={style['empty-cart-wrapper']}>
      <div className={style['message-wrapper']}>
        <h6 className={style.title}>
          Your cart is in zero gravity!
          <br />
          Add some NASA merch to bring it back to Earth 🌍
        </h6>
        <Link to={ROUTES.CATALOG_ALL} className={`${style['empty-state-button']} button-secondary`}>
          Explore Catalog
        </Link>
      </div>
    </section>
  );
}
