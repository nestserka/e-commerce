import { useEffect, useRef, useState } from 'react';

import styles from './_modalAbout.module.scss'
import closeIcon from '../../../assets/images/icons/icon-close-model.svg';

export interface ModalFromAboutPageProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function ModalFromAboutPage({ isOpen, children }:  ModalFromAboutPageProps): JSX.Element {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen,isOpen]);

  const handleCloseModal = (): void => {

    setModalOpen(false);
  };

  return (
    <dialog ref={modalRef} className={styles.modal}>
      <button type="button" className={styles['modal-close-btn']} onClick={handleCloseModal}>
        <img src={closeIcon} alt="Edit" />
      </button>
      {children}
    </dialog>
  );
}
