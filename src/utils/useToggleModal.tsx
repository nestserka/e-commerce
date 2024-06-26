import { useState } from 'react';

export function useToggleModal(): [boolean, () => void, () => void] {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = (): void => {
    document.body.style.overflowY = 'hidden';
    setIsOpen(true);
  };

  const closeModal = (): void => {
    document.body.style.overflowY = 'auto';
    setIsOpen(false);
  };

  return [isOpen, openModal, closeModal];
}

export default useToggleModal;
