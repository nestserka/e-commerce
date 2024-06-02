
import { useState } from 'react';

import style from './_profileField.module.scss';
import editIcon from '../../assets/images/icons/icon-edit.svg';
import deleteIcon from '../../assets/images/icons/icon-delete.svg';
import InputCheckBox from '../ui/checkbox/checkbox';
import { useCustomerInfo } from '../../core/state/userState';
import updateCustomer from '../../api/me/updateCustomer';
import { VERSION_ERROR_MESSAGE } from '../../utils/types';
import ErrorMessage from '../errorMessage/ErrorMessage';

import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';

interface ProfileFieldProps {
  title: string;
  onEditClick: () => void;
  inputVal: string;
  isAddress: boolean;
  isDefault: boolean;
  id?: string;
}


export default function ProfileField({
  title,
  onEditClick,
  inputVal,
  isAddress,
  isDefault,
  id = '',
} : ProfileFieldProps): JSX.Element {
  const { version, removeAddress } = useCustomerInfo();
  const [formError, setFormError] = useState<string>('');
  const handleDeleteClick = async (): Promise<void> => {
    if (id && id.length > 2) {
      const body: MyCustomerUpdateAction[] = [
        {
          action: 'removeAddress',
          addressId: id,
        },
      ];
      await updateCustomer(version, body)
        .then((response) => {
          const addressType = title.startsWith('B') ? 'billing' : 'shipping';
          removeAddress(id, addressType, response.version);
        })
        .catch((error: Error) => {
          setFormError('');

          if (error.message.includes('different version')) {
            setFormError(VERSION_ERROR_MESSAGE);
          }
        });
    }
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
      {formError && <ErrorMessage message={formError} />}
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
