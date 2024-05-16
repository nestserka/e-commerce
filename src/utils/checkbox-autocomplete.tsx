import { useEffect } from 'react';

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { RegistrationFormValues } from '../domain/customer/registrationForm/registrationForm';

interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

type OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

export const useAutoComplete = (
  mainAddress: Address | undefined,
  isAutoCompleteChecked: boolean,
  setValue: UseFormSetValue<RegistrationFormValues>,
  setIsAutoCompleteChecked: Dispatch<SetStateAction<boolean>>,
): OnChangeHandler => {
  const handleAutoComplete = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsAutoCompleteChecked(e.target.checked);

    if (!e.target.checked) {
      setValue('billingAddress.street', '');
      setValue('billingAddress.city', '');
      setValue('billingAddress.postalCode', '');
      setValue('billingAddress.country', 'Select Country');
      setValue('shippingAddress.street', '');
      setValue('shippingAddress.city', '');
      setValue('shippingAddress.postalCode', '');
      setValue('shippingAddress.country', 'Select Country');
    }
  };

  useEffect(() => {
    if (isAutoCompleteChecked && mainAddress) {
      setValue('billingAddress.street', mainAddress.street, { shouldValidate: false });
      setValue('billingAddress.city', mainAddress.city, { shouldValidate: false });
      setValue('billingAddress.postalCode', mainAddress.postalCode, { shouldValidate: false });
      setValue('billingAddress.country', mainAddress.country, { shouldValidate: false });
      setValue('shippingAddress.street', mainAddress.street, { shouldValidate: false });
      setValue('shippingAddress.city', mainAddress.city, { shouldValidate: false });
      setValue('shippingAddress.postalCode', mainAddress.postalCode, { shouldValidate: false });
      setValue('shippingAddress.country', mainAddress.country, { shouldValidate: false });
    }
  }, [mainAddress, isAutoCompleteChecked, setValue]);

  return handleAutoComplete;
};

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
      setValue(`${addressType}Address.street`, '');
      setValue(`${addressType}Address.city`, '');
      setValue(`${addressType}Address.postalCode`, '');
      setValue(`${addressType}Address.country`, 'Select Country');
    }
  };

  useEffect(() => {
    if (isAutoCompleteChecked && address) {
      const updatedAddress = {
        street: address.street,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
      };

      setValue(`${addressType}Address`, updatedAddress, { shouldValidate: false });
    }
  }, [address, isAutoCompleteChecked, setValue, addressType]);

  return handleAutoComplete;
};
