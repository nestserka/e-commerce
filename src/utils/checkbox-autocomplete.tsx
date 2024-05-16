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


export const useAutoComplete = (mainAddress: Address, isAutoCompleteChecked: boolean, setValue: UseFormSetValue<RegistrationFormValues>,  setIsAutoCompleteChecked: Dispatch<SetStateAction<boolean>>) : OnChangeHandler=> {
  const handleAutoComplete = (e: ChangeEvent<HTMLInputElement>) : void => {
    setIsAutoCompleteChecked(e.target.checked);

    if (!e.target.checked) {
      setValue('billingAddress.street', '');
      setValue('billingAddress.city', '');
      setValue('billingAddress.postalCode', '');
      setValue('billingAddress.country', '');
      setValue('shippingAddress.street', '');
      setValue('shippingAddress.city', '');
      setValue('shippingAddress.postalCode', '');
      setValue('shippingAddress.country', '');
    }
  };

  useEffect(() => {
    if (isAutoCompleteChecked) {
        setValue('billingAddress.street', mainAddress.street, { shouldValidate: true });
    setValue('billingAddress.city', mainAddress.city, { shouldValidate: true });
    setValue('billingAddress.postalCode', mainAddress.postalCode, { shouldValidate: true });
    setValue('billingAddress.country', mainAddress.country, { shouldValidate: true });
    setValue('shippingAddress.street', mainAddress.street, { shouldValidate: true });
    setValue('shippingAddress.city', mainAddress.city, { shouldValidate: true });
    setValue('shippingAddress.postalCode', mainAddress.postalCode, { shouldValidate: true });
    setValue('shippingAddress.country', mainAddress.country, { shouldValidate: true });
    }
  }, [mainAddress, isAutoCompleteChecked, setValue]);

  return handleAutoComplete;
};