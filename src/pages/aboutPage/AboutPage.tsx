import styles from './_about.module.scss';

export default function AboutPage(): JSX.Element {
  return (
    <section className={styles.about} data-testid="about">
      About
    </section>
  );
}
