import { useEffect, useState } from 'react';

import { showModalMessage } from '../../core/state/loginState';
import style from './_modalMessage.module.scss';
import successIcon from '../../assets/images/icons/success-icon.svg';

export default function ModalMessage({
  type,
  title,
  message,
}: {
  type: string;
  title: string;
  message: string;
}): JSX.Element {
  const { isShown, setIsShown } = showModalMessage();
  const [isShownClass, setIsShownClass] = useState(false);

  useEffect(() => {
    if (isShown) {
      setIsShownClass(true);
      setTimeout(() => {
        setIsShownClass(false);
      }, 2500);
      setTimeout(() => {
        setIsShown(false);
      }, 3000);
    }
  }, [isShown, setIsShownClass, setIsShown]);

  return (
    <section className={`${style.wrapper} ${isShownClass ? style.show : style.hide}`} data-testid="modal-message">
      <button
        aria-label="Close"
        type="button"
        className={style['close-button']}
        onClick={(): void => {
          setIsShown(false);
        }}
      />
      <div className={style['title-wrapper']}>
        {type === 'success' && <img src={successIcon} className={style.icon} alt="" />}
        <h3 className={style.title}>{title}</h3>
      </div>
      <p className={style.message}>{message}</p>
    </section>
  );
}
