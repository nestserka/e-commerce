import style from './_profileField.module.scss';
import editIcon from '../../assets/images/icons/icon-edit.svg';

export default function ProfileField({
  title,
  onEditClick,
  inputVal,
}: {
  title: string;
  onEditClick: () => void;
  inputVal: string;
}): JSX.Element {
  return (
    <section className={style['profile-field']}>
      <section className={style['profile-subtitle-wrapper']}>
        <p className={style['profile-subtitle']}>{title}</p>
        <button type="button" className={style['edit-button']} onClick={onEditClick}>
          <img src={editIcon} alt="Edit" />
        </button>
      </section>
      <p className={style['profile-field-input']}>{inputVal}</p>
      <span className={style['profile-horizontal-line']} />
    </section>
  );
}
