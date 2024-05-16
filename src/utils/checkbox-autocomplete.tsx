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
      setValue('billingAddress.country', '');
      setValue('shippingAddress.street', '');
      setValue('shippingAddress.city', '');
      setValue('shippingAddress.postalCode', '');
      setValue('shippingAddress.country', '');
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

export const useShippingComplete = (
  shippingAddress: Address | undefined,
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
      setValue('billingAddress.country', '');
    }
  };

  useEffect(() => {
    if (isAutoCompleteChecked && shippingAddress) {
      setValue('billingAddress.street', shippingAddress.street, { shouldValidate: false });
      setValue('billingAddress.city', shippingAddress.city, { shouldValidate: false });
      setValue('billingAddress.postalCode', shippingAddress.postalCode, { shouldValidate: false });
      setValue('billingAddress.country', shippingAddress.country, { shouldValidate: false });
    }
  }, [shippingAddress, isAutoCompleteChecked, setValue]);

  return handleAutoComplete;
};

export const useBillingComplete = (
  billingAddress: Address | undefined,
  isAutoCompleteChecked: boolean,
  setValue: UseFormSetValue<RegistrationFormValues>,
  setIsAutoCompleteChecked: Dispatch<SetStateAction<boolean>>,
): OnChangeHandler => {
  const handleAutoComplete = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsAutoCompleteChecked(e.target.checked);

    if (!e.target.checked) {
      setValue('shippingAddress.street', '');
      setValue('shippingAddress.city', '');
      setValue('shippingAddress.postalCode', '');
      setValue('shippingAddress.country', '');
    }
  };

  useEffect(() => {
    if (isAutoCompleteChecked && billingAddress) {
      setValue('shippingAddress.street', billingAddress.street, { shouldValidate: false });
      setValue('shippingAddress.city', billingAddress.city, { shouldValidate: false });
      setValue('shippingAddress.postalCode', billingAddress.postalCode, { shouldValidate: false });
      setValue('shippingAddress.country', billingAddress.country, { shouldValidate: false });
    }
  }, [billingAddress, isAutoCompleteChecked, setValue]);

  return handleAutoComplete;
};
