import styles from './_modalAbout.module.scss';
import closeIcon from '../../../assets/images/icons/icon-close-model.svg';

export interface ModalFromAboutPageProps {
  isOpen: () => void;
  children: React.ReactNode;
}

export default function ModalFromAboutPage({ isOpen, children }: ModalFromAboutPageProps): JSX.Element {
  return (
    <>
      <button type="button" className={styles.overlay} onClick={isOpen} aria-label="Close Modal" />
      <section className={styles.modal}>
        <button type="button" className={styles['modal-close-btn']} onClick={isOpen}>
          <img src={closeIcon} alt="Edit" />
        </button>
        {children}
      </section>
    </>
  );
}
