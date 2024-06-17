import styles from './_modalAbout.module.scss';
import closeIcon from '../../../assets/images/icons/icon-close-model.svg';

export interface ModalFromAboutPageProps {
  isOpen: () => void;
  children: React.ReactNode;
}

export default function ModalFromAboutPage({ isOpen, children }: ModalFromAboutPageProps): JSX.Element {
  const handleCloseModal = (): void => {
    isOpen();
  };

  return (
    <>
      <div className={styles.overlay} />
      <section className={styles.modal}>
        <button type="button" className={styles['modal-close-btn']} onClick={handleCloseModal}>
          <img src={closeIcon} alt="Edit" />
        </button>
        {children}
      </section>
    </>
  );
}
