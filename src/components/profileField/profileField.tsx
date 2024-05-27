import style from './_profileField.module.scss';
import editIcon from '../../assets/images/icons/icon-edit.svg';
import deleteIcon from '../../assets/images/icons/icon-delete.svg';

export default function ProfileField({
  title,
  onEditClick,
  inputVal,
  isAddress
}: {
  title: string;
  onEditClick: () => void;
  inputVal: string;
  isAddress: boolean
}): JSX.Element {

  const handleDeleteClick = (): void => {
    console.log('Delete button clicked');
  };

  return (
    <section className={style['profile-field']}>
      <section className={style['profile-subtitle-wrapper']}>
        <p className={style['profile-subtitle']}>{title}</p>
        <div className={style['profile-button-wrapper']} >
        <button type="button" className={style['edit-button']} onClick={onEditClick}>
          <img src={editIcon} alt="Edit" />
        </button>
        {isAddress && (
          <button type="button" className={style['edit-button']} onClick={handleDeleteClick}>
          <img src={deleteIcon} alt="Delete" />
        </button>
        )}
        </div>
      </section>
      <p className={style['profile-field-input']}>{inputVal}</p>
      <span className={style['profile-horizontal-line']} />
    </section>
  );
}
