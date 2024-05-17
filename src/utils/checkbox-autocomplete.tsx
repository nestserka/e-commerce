import { useEffect } from 'react';

import type { Address } from './types';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { RegistrationFormValues } from '../domain/customer/registrationForm/registrationForm';

type OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;


export const useAddressAutoComplete = (
  address: Address | undefined,
  isAutoCompleteChecked: boolean,
  setValue: UseFormSetValue<RegistrationFormValues>,
  setIsAutoCompleteChecked: Dispatch<SetStateAction<boolean>>,
  addressType: 'shipping' | 'billing',
): OnChangeHandler => {
  const handleAutoComplete = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsAutoCompleteChecked(e.target.checked);

    if (!e.target.checked) {
      setValue(`${addressType}Address.streetName`, '');
      setValue(`${addressType}Address.city`, '');
      setValue(`${addressType}Address.postalCode`, '');
      setValue(`${addressType}Address.country`, 'Select Country');
    }
  };

  useEffect(() => {
    if (isAutoCompleteChecked && address) {
      const updatedAddress = {
        streetName: address.streetName,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
      };

      setValue(`${addressType}Address`, updatedAddress, { shouldValidate: false });
    }
  }, [address, isAutoCompleteChecked, setValue, addressType]);

  return handleAutoComplete;
};
