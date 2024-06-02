import { useState } from 'react';

import { VERSION_ERROR_MESSAGE } from '../../utils/types';
import ModalProfile from './ModalProfile';
import style from '../../domain/customer/forms/_forms.module.scss';
import { showModalMessage, useCustomerInfo } from '../../core/state/userState';
import ErrorMessage from '../errorMessage/ErrorMessage';
import updateCustomer from '../../api/me/updateCustomer';

import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import type { FormModal } from '../../utils/types';

export default function DeleteAddressForm({ isOpen, onClose, addressId, addressType }: FormModal): JSX.Element {
  const { version, removeAddress } = useCustomerInfo();
  const [formError, setFormError] = useState<string>('');
  const { setIsShown } = showModalMessage();
  const deleteAddress = async (): Promise<void> => {
    const body: MyCustomerUpdateAction[] = [
      {
        action: 'removeAddress',
        addressId,
      },
    ];
    await updateCustomer(version, body)
      .then((response) => {
        if ((addressType === 'shipping' || addressType === 'billing') && typeof addressId === 'string') {
            console.log(addressType);
          removeAddress(addressId, addressType, response.version);
        }

        onClose();
        setIsShown(true);
      })
      .catch((error: Error) => {
        setFormError('');

        if (error.message.includes('different version')) {
          setFormError(VERSION_ERROR_MESSAGE);
        }
      });
  };

  return (
    <ModalProfile isOpen={isOpen} onClose={onClose}>
        <div className={style['address-form']} data-testid="address-form">
      <p className={style['confirm-text']}>Are you sure you want to delete the address?</p>
      <div className={style['button-group']}>
        {formError && <ErrorMessage message={formError} />}
        <button type="button" className={style['close-button']} onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className={style['confirm-button']} onClick={deleteAddress}>
          OK
        </button>
      </div>
      </div>
    </ModalProfile>
  );
}
