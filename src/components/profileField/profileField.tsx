import style from './_profileField.module.scss';
import editIcon from '../../assets/images/icons/icon-edit.svg';
import deleteIcon from '../../assets/images/icons/icon-delete.svg';
import InputCheckBox from '../ui/checkbox/checkbox';

export default function ProfileField({
  title,
  onEditClick,
  inputVal,
  isAddress,
  isDefault,
}: {
  title: string;
  onEditClick: () => void;
  inputVal: string;
  isAddress: boolean;
  isDefault: boolean;
}): JSX.Element {
  const handleDeleteClick = (): void => {
    console.log('Delete button clicked');
    console.log(isDefault);
  };

  return (
    <section className={style['profile-field']}>
      <section className={style['profile-subtitle-wrapper']}>
        <p className={style['profile-subtitle']}>{title}</p>
        <div className={style['profile-button-wrapper']}>
          <button type="button" className={style['edit-button']} onClick={onEditClick}>
            <img src={editIcon} alt="Edit" />
          </button>
          {isAddress && (
            <button type="button" className={style['delete-button']} onClick={handleDeleteClick}>
              <img src={deleteIcon} alt="Delete" />
            </button>
          )}
        </div>
      </section>
      <p className={style['profile-field-input']}>{inputVal}</p>
      {isDefault && isAddress && (
        <InputCheckBox
          id="profile"
          name="profile"
          label={`This address is set as default ${title}`}
          isCheckBoxDisabled
        />
      )}
      <span className={style['profile-horizontal-line']} />
    </section>
  );
}
