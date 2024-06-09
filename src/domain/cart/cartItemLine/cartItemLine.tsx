import style from './_cartItemLine.module.scss';
import iconDelete from '../../../assets/images/icons/icon-delete.svg';

interface CartItemLineProps {
  imageUrl: string;
  productName: string;
  currentPrice: number;
  discount: string;
  priceBeforeDiscount: number;
  quantity: number;
  totalInitialPrice: number;
}

export default function CartItemLine({
  imageUrl,
  productName,
  currentPrice,
  discount,
  priceBeforeDiscount,
  quantity,
  totalInitialPrice,
}: CartItemLineProps): JSX.Element {
  return (
    <section className={style['item-line-wrapper']} data-testid="cart-item-line">
      <img src={imageUrl} alt={productName} />
      <h3 className={style.title}>{productName}</h3>
      <section className={style['price-wrapper']}>
        <div className={style['current-price-wrapper']}>
          <p className={style['current-price-value']}>{currentPrice}</p>
          <div className={style['discount-badge']}>{discount}</div>
        </div>
        <p className={style['old-price-value']}>{priceBeforeDiscount}</p>
      </section>
      <section className={style['quantity-input-wrapper']}>
        <button type="button">-</button>
        <p className={style['quantity-number']}>{quantity}</p>
        <button type="button">+</button>
      </section>
      <p className={style['total-price']}>{totalInitialPrice}</p>
      <button type="button" className={style['remove-item-btn']}>
        <img src={iconDelete} alt="Edit" className={style['icon-delete']} />
      </button>
    </section>
  );
}
