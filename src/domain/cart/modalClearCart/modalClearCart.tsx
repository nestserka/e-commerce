import style from './_modalClearCart.module.scss';
import closeIcon from '../../../assets/images/icons/close-icon.svg';

import type { ModalClearCartProps } from './types';

export default function ModalClearCart({ onConfirm, onCancel }: ModalClearCartProps): JSX.Element {
  return (
    <>
      <div className={style.overlay} />
      <div className={style.modal}>
        <button type="button" className={style['modal-close-btn']} onClick={onCancel}>
          <img src={closeIcon} alt="Edit" />
        </button>
        <div className={style['clear-cart-form']} data-testid="clear-cart-form">
          <p className={style['confirm-text']}>Are you sure you want to clear the cart?</p>
          <div className={style['button-group']}>
            <button type="button" className={`${style['close-button']} button-secondary`} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={`${style['confirm-button']} button-secondary`} onClick={onConfirm}>
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
