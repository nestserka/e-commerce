import style from './_infoField.module.scss';
import styles from '../../../components/profileField/_profileField.module.scss'

export default function InfoField({ title, value }: { title: string; value: string }): JSX.Element {
  return (
    <section className={styles['profile-field']}>
      <section className={style['info-field-wrapper']}>
        <div className={style['profile-subtitle']}>{title}</div>
        <p className={style['profile-field-input']}>{value}</p>
      </section>
      <span className={styles['profile-horizontal-line']} />
    </section>
  );
}
