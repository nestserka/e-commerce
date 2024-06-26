import styles from '../loader/_loader.module.scss';

export default function LoaderForButton(): JSX.Element {
  return <div className={`${styles['loader-button']} ${styles.leo} ${styles.infinite}`} />;
}
