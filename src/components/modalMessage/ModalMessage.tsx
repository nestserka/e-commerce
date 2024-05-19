import { useEffect, useState } from 'react';

import style from './_modalMessage.module.scss';
import successIcon from '../../assets/images/icons/success-icon.svg';

export default function ModalMessage({
  type,
  title,
  message,
  isShow,
}: {
  type: string;
  title: string;
  message: string;
  isShow: boolean;
}): JSX.Element {
  const [isShown, setIsShown] = useState(isShow);

  useEffect(() => {
    if (isShown) {
      setIsShown(true);
      setTimeout(() => {
        setIsShown(false);
      }, 2500);
    } else {
      setIsShown(false);
    }
  }, [isShown]);

  return (
    <section className={`${style.wrapper} ${isShown ? style.show : style.hide}`} data-testid="modal-message">
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
