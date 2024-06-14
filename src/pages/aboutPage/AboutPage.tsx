import Loader from '../../components/loader/Loader';
import styles from './_about.module.scss';

export default function AboutPage(): JSX.Element {
  return (
    <section className={styles.about} data-testid="about">
      <Loader />
    </section>
  );
}
