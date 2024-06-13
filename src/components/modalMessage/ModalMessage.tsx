import { useEffect } from 'react';

import { showErrorMessage, showModalMessage } from '../../core/state/userState';
import style from './_modalMessage.module.scss';
import successIcon from '../../assets/images/icons/success-icon.svg';
import { logOut } from '../../utils/logOut';

export default function ModalMessage({
  type,
  title,
  message,
}: {
  type: string;
  title: string;
  message: string;
}): JSX.Element {
  const { isShown, setIsShown, isClipBoardShown, setIsClipShown } = showModalMessage();
  const { isErrorShown, setErrorIsShown } = showErrorMessage();

  useEffect(() => {
    if (isShown) {
      setTimeout(() => {
        setIsShown(false);
      }, 3000);
    }
  }, [isShown, setIsShown]);

  useEffect(() => {
    if (isClipBoardShown) {
      setTimeout(() => {
        setIsClipShown(false);
      }, 3000);
    }
  }, [isClipBoardShown, setIsClipShown]);

  useEffect(() => {
    if (isErrorShown) {
      setTimeout(() => {
        setErrorIsShown(false);
        logOut();
      }, 5000);
    }
  }, [isErrorShown, setErrorIsShown]);

  return (
    <section className={`${style.wrapper} ${isErrorShown ? style.error : style.visible}`} data-testid="modal-message">
      <button
        aria-label="Close"
        type="button"
        className={style['close-button']}
        onClick={(): void => {
          setIsShown(false);
          setErrorIsShown(false);
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
