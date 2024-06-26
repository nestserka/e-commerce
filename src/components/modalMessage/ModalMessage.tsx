import { useEffect } from 'react';

import { showErrorMessage, showModalMessage } from '../../core/state/userState';
import styles from './_modalMessage.module.scss';
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
    <section
      className={`${styles.wrapper} ${isErrorShown ? styles.error : styles.visible}`}
      data-testid="modal-message"
    >
      <button
        aria-label="Close"
        type="button"
        className={styles['close-button']}
        onClick={(): void => {
          setIsShown(false);
          setErrorIsShown(false);
        }}
      />
      <div className={styles['title-wrapper']}>
        {type === 'success' && <img src={successIcon} className={styles.icon} alt="" />}
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.message}>{message}</p>
    </section>
  );
}
