import style from './_profileField.module.scss';
import editIcon from '../../assets/images/icons/icon-edit.svg';
import deleteIcon from '../../assets/images/icons/icon-delete.svg';
import InputCheckBox from '../ui/checkbox/checkbox';
import { useToggleModal } from '../../utils/useToggleModal';
import DeleteAddressForm from '../modalProfile/confirmDelete';

import type { ProfileFieldProps } from './types';

export default function ProfileField({
  title,
  onEditClick,
  inputVal,
  isAddress,
  isDefault,
  id = '',
}: ProfileFieldProps): JSX.Element {
  const [isDeleteModalOpen, openDeleteModal, closeDeleteModal] = useToggleModal();
  const addressType = title.startsWith('B') ? 'billing' : 'shipping';

  return (
    <section className={style['profile-field']}>
      <section className={style['profile-subtitle-wrapper']}>
        <p className={style['profile-subtitle']}>{title}</p>
        <div className={style['profile-button-wrapper']}>
          <button type="button" className={style['edit-button']} onClick={onEditClick}>
            <img src={editIcon} alt="Edit" />
          </button>
          {isAddress && id !== '' && (
            <button type="button" className={style['delete-button']} onClick={openDeleteModal}>
              <img src={deleteIcon} alt="Delete" />
            </button>
          )}
          {isDeleteModalOpen && (
            <DeleteAddressForm
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              addressId={id}
              addressType={addressType}
            />
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
          isValue={isDefault}
        />
      )}
      <span className={style['profile-horizontal-line']} />
    </section>
  );
}
