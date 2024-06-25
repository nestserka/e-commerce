import styles from './_loader.module.scss';

export default function Loader(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.loader}>Loading</span>
        <div className={styles.a}>
          <div className={styles['spinner-box']} data-js="spinner-box">
            <div className={`${styles['earth-wrapper']} ${styles.leo} ${styles.infinite}`}>
              <div className={styles['planet-orbit']} />
              <div className={`${styles.earth} ${styles.infinite}`} />
            </div>
            <div className={`${styles['mars-wrapper']} ${styles.leo} ${styles.infinite}`}>
              <div className={styles['planet-orbit']} />
              <div className={`${styles.mars} ${styles.infinite}`} />
            </div>
            <div className={`${styles['jupiter-wrapper']} ${styles.leo} ${styles.infinite}`}>
              <div className={styles['planet-orbit']} />
              <div className={`${styles.jupiter} ${styles.infinite}`} />
            </div>
            <div className={styles['sun-wrapper']}>
              <div className={styles.sun} />
              <div className={`${styles['sun-particle']} ${styles.p1}`} />
              <div className={`${styles['sun-particle']} ${styles.p2}`} />
              <div className={`${styles['sun-particle']} ${styles.p3}`} />
              <div className={`${styles['sun-particle']} ${styles.p4}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
