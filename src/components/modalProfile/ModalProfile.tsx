import { useEffect, useRef, useState } from 'react';

import style from './_modalProfile.module.scss';
import closeIcon from '../../assets/images/icons/icon-close-model.svg'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalProfile({ isOpen, onClose, children }: ModalProps): JSX.Element {
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
  }, [isModalOpen]);

  const handleCloseModal = (): void => {
    onClose();

    setModalOpen(false);
  };

  return (
    <dialog ref={modalRef} className={style.modal}>
      <button type="button" className={style['modal-close-btn']} onClick={handleCloseModal}>
      <img src={closeIcon} alt="Edit" />
      </button>
      {children}
    </dialog>
  );
}
