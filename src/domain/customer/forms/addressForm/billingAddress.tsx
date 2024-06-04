import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Select } from 'antd';

import style from '../_forms.module.scss';
import { ADDRESS_VALIDATION_SCHEMA, ERROR_TYPES } from '../../../../constants/constants';
import FormTitle from '../../../../components/formTitle/FormTitle';
import ErrorMessage from '../../../../components/errorMessage/ErrorMessage';
import ModalProfile from '../../../../components/modalProfile/ModalProfile';
import { type FormModal, VERSION_ERROR_MESSAGE } from '../../../../utils/types';
import Input from '../../../../components/ui/input/input';
import { showErrorMessage, showModalMessage, useCustomerInfo } from '../../../../core/state/userState';
import {
  inputBillingCityProps,
  inputBillingPostalCodeProps,
  inputBillingStreetProps,
} from '../../../../utils/inputProps';
import ControllerLabel from '../../../../components/ui/controllerLabel/label';
import InputCheckBox from '../../../../components/ui/checkbox/checkbox';
import updateCustomer from '../../../../api/me/updateCustomer';

import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';

const schema = z.object({
  billingAddress: ADDRESS_VALIDATION_SCHEMA,
  defaultBillingAddress: z.boolean().optional(),
});

export type BillingFormValues = z.infer<typeof schema>;

export default function BillingAddressForm({ isOpen, onClose, billingAddressId }: FormModal): JSX.Element {
  const { billingAddress, version, updateAddress, setDefault } = useCustomerInfo();
  const address = billingAddress.find((addr) => addr.id === billingAddressId);
  const { setErrorIsShown } = showErrorMessage();

  const { register, handleSubmit, formState, reset, control, watch, trigger } = useForm<BillingFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      billingAddress: {
        streetName: address?.streetName ?? '',
        city: address?.city ?? '',
        postalCode: address?.postalCode ?? '',
        country: address?.country ?? 'Select Country',
      },
      defaultBillingAddress: address?.isDefault ?? false,
    },
  });

  const { errors, isDirty, isValid, isSubmitting } = formState;
  const { setIsShown } = showModalMessage();
  const [formError, setFormError] = useState<string>('');

  useEffect(() => {
    const subscription = watch((_value, { name }) => {
      if (name === 'billingAddress.country') {
        trigger(['billingAddress.postalCode']).catch((error: Error) => {
          console.error('Error triggering billingAddress.postalCode:', error);
        });
      }
    });

    return (): void => {
      subscription.unsubscribe();
    };
  }, [watch, trigger]);

  const onSubmit = async (data: BillingFormValues): Promise<void> => {
    const body: MyCustomerUpdateAction[] = [
      {
        action: 'changeAddress',
        addressId: billingAddressId,
        address: data.billingAddress,
      },
    ];
    await updateCustomer(version, body)
      .then(async (response) => {
        const updatedAddress = response.addresses.find((addr) => addr.id === billingAddressId);
        console.log(updateAddress);

        if (updatedAddress && billingAddressId) {
          updateAddress(billingAddressId, updatedAddress, response.version, 'billing');
        }

        if (address?.isDefault !== data.defaultBillingAddress && billingAddressId) {
          if (data.defaultBillingAddress) {
            const setDefaultAddress: MyCustomerUpdateAction[] = [
              {
                action: 'setDefaultBillingAddress',
                addressId: billingAddressId,
              },
              {
                action: 'addBillingAddressId',
                addressId: billingAddressId,
              },
            ];
            await updateCustomer(version, setDefaultAddress).then((res) => {
              setDefault(billingAddressId, res.version, true, 'billing');
            });
          } else {
            const removeDefaultAddress: MyCustomerUpdateAction[] = [
              {
                action: 'removeBillingAddressId',
                addressId: billingAddressId,
              },
              {
                action: 'addBillingAddressId',
                addressId: billingAddressId,
              },
            ];
            await updateCustomer(version, removeDefaultAddress).then((resp) => {
              setDefault(billingAddressId, resp.version, false, 'billing');
            });
          }
        }

        setIsShown(true);
        onClose();
        reset();
      })
      .catch((error: Error) => {
        setFormError('');

        if (error.message.includes(ERROR_TYPES.VERSION_ERROR)) {
          setFormError(VERSION_ERROR_MESSAGE);
        } else if (error.message.includes(ERROR_TYPES.INVALID_REFRESH_TOKEN)) {
          setErrorIsShown(true);
        } else if (error.message.includes(ERROR_TYPES.INVALID_JSON)) {
          setFormError('Something wrong with the data, try to insert again');
        } else {
          setFormError(error.message);
        }
      });
  };

  return (
    <ModalProfile isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={style['general-form']} data-testid="general-form" noValidate>
        <FormTitle title="Edit Billing Address" isIcon={false} />
        {formError && <ErrorMessage message={formError} />}
        <div className={style['form-group']}>
          <section className={style['input-section']}>
            <Input
              inputProps={{
                ...register('billingAddress.streetName'),
                ...inputBillingStreetProps,
              }}
              label="Street "
            />
            {errors.billingAddress?.streetName && <ErrorMessage message={errors.billingAddress.streetName.message} />}
          </section>
          <section className={style['input-section']}>
            <Input
              inputProps={{
                ...register('billingAddress.city'),
                ...inputBillingCityProps,
              }}
              label="City "
            />
            {errors.billingAddress?.city && <ErrorMessage message={errors.billingAddress.city.message} />}
          </section>
        </div>
        <div className={style['form-group']}>
          <section className={style['input-section']}>
            <ControllerLabel
              control={
                <Controller
                  control={control}
                  name="billingAddress.country"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onChange={onChange}
                      getPopupContainer={(node: HTMLElement) => {
                        if (node.parentNode instanceof HTMLElement) {
                          return node.parentNode;
                        }

                        return document.body;
                      }}
                      value={value}
                      popupMatchSelectWidth={false}
                      options={[
                        { value: 'US', label: 'United States' },
                        { value: 'CA', label: 'Canada' },
                      ]}
                    />
                  )}
                />
              }
              label="Country  "
            />
            {errors.billingAddress?.country && <ErrorMessage message={errors.billingAddress.country.message} />}
          </section>
          <section className={style['input-section']}>
            <Input
              inputProps={{
                ...register('billingAddress.postalCode'),
                ...inputBillingPostalCodeProps,
              }}
              label="Postal Code "
            />
            {errors.billingAddress?.postalCode && <ErrorMessage message={errors.billingAddress.postalCode.message} />}
          </section>
        </div>
        <Controller
          control={control}
          name="defaultBillingAddress"
          render={({ field: { onChange, value } }) => (
            <InputCheckBox
              onChange={onChange}
              id="billing"
              name="billing"
              label="Set Billing Address as default"
              isValue={value}
            />
          )}
        />
        <button type="submit" className="button-primary" disabled={!isDirty || !isValid || isSubmitting}>
          Change Billing Address
        </button>
      </form>
    </ModalProfile>
  );
}
