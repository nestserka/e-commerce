import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Select } from 'antd';

import style from '../_forms.module.scss';
import { ADDRESS_VALIDATION_SCHEMA, ERROR_TYPES, SHIPPING_TYPE_VALIDATION_SCHEMA } from '../../../../constants/constants';
import FormTitle from '../../../../components/formTitle/FormTitle';
import ErrorMessage from '../../../../components/errorMessage/ErrorMessage';
import ModalProfile from '../../../../components/modalProfile/ModalProfile';
import { type FormModal, VERSION_ERROR_MESSAGE } from '../../../../utils/types';
import Input from '../../../../components/ui/input/input';
import { showErrorMessage, showModalMessage, useCustomerInfo } from '../../../../core/state/userState';
import {
  inputShippingCityProps,
  inputShippingPostalCodeProps,
  inputShippingStreetProps,
} from '../../../../utils/inputProps';
import ControllerLabel from '../../../../components/ui/controllerLabel/label';
import InputCheckBox from '../../../../components/ui/checkbox/checkbox';
import createNewAddress from '../../../../api/me/createNewAddress';

const schema = z.object({
  newAddress: ADDRESS_VALIDATION_SCHEMA,
  defaultAddress: z.boolean().optional(),
  addressType: SHIPPING_TYPE_VALIDATION_SCHEMA,
});

export type AddressFormValues = z.infer<typeof schema>;

export default function AddressForm({ isOpen, onClose }: FormModal): JSX.Element {
  const { version, addAddress } = useCustomerInfo();
  const { register, handleSubmit, formState, reset, control, watch, trigger } = useForm<AddressFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { errors, isDirty, isValid, isSubmitting } = formState;
  const { setIsShown } = showModalMessage();
  const [formError, setFormError] = useState<string>('');
  const { setErrorIsShown } = showErrorMessage();

  useEffect(() => {
    const subscription = watch((_value, { name }) => {
      if (name === 'newAddress.country') {
        trigger(['newAddress.postalCode']).catch((error: Error) => {
          console.error('Error triggering postalCode:', error);
        });
      }
    });

    return (): void => {
      subscription.unsubscribe();
    };
  }, [watch, trigger]);

  const onSubmit = async (data: AddressFormValues): Promise<void> => {
    await createNewAddress(version, data.addressType, data.newAddress, data.defaultAddress ?? false)
      .then((response) => {
        const newAddress = response.addresses[response.addresses.length - 1];

        if (data.addressType === 'shipping' || data.addressType === 'billing') {
          addAddress(newAddress, response.version, data.addressType, data.defaultAddress ?? false);
        }

        setIsShown(true);
        onClose();
        reset();
      })
      .catch((error: Error) => {
        if (error.message.includes(ERROR_TYPES.VERSION_ERROR)) {
          setFormError(VERSION_ERROR_MESSAGE);
        } else if (error.message.includes(ERROR_TYPES.INVALID_TOKEN)) {
          setErrorIsShown(true);
        } else if(error.message.includes(ERROR_TYPES.INVALID_JSON)){
          setFormError('Something wrong with the data, try to insert again');
        } else {
          setFormError(error.message);
        }
      });
  };

  return (
    <ModalProfile isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={style['address-form']} data-testid="address-form" noValidate>
        <FormTitle title="Add New Address" isIcon={false} />
        {formError && <ErrorMessage message={formError} />}
        <div className={style['form-group']}>
          <section className={style['input-section']}>
            <Input
              inputProps={{
                ...register('newAddress.streetName'),
                ...inputShippingStreetProps,
              }}
              label="Street "
            />
            {errors.newAddress?.streetName && <ErrorMessage message={errors.newAddress.streetName.message} />}
          </section>
          <section className={style['input-section']}>
            <Input
              inputProps={{
                ...register('newAddress.city'),
                ...inputShippingCityProps,
              }}
              label="City "
            />
            {errors.newAddress?.city && <ErrorMessage message={errors.newAddress.city.message} />}
          </section>
        </div>

        <div className={style['form-group']}>
          <section className={style['input-section']}>
            <ControllerLabel
              control={
                <Controller
                  control={control}
                  name="newAddress.country"
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
                      defaultValue="Select Country"
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
            {errors.newAddress?.country && <ErrorMessage message={errors.newAddress.country.message} />}
          </section>
          <section className={style['input-section']}>
            <Input
              inputProps={{
                ...register('newAddress.postalCode'),
                ...inputShippingPostalCodeProps,
              }}
              label="Postal Code "
            />
            {errors.newAddress?.postalCode && <ErrorMessage message={errors.newAddress.postalCode.message} />}
          </section>
        </div>
        <section className={style['input-section']}>
          <ControllerLabel
            control={
              <Controller
                control={control}
                name="addressType"
                render={({ field: { onChange, value } }) => (
                  <Select
                    onChange={onChange}
                    getPopupContainer={(node: HTMLElement) => {
                      if (node.parentNode instanceof HTMLElement) {
                        return node.parentNode;
                      }

                      return document.body;
                    }}
                    defaultValue="Select Type"
                    value={value}
                    popupMatchSelectWidth={false}
                    options={[
                      { value: 'shipping', label: 'Shipping' },
                      { value: 'billing', label: 'Billing' },
                    ]}
                  />
                )}
              />
            }
            label="Choose Address Type  "
          />
          {errors.newAddress?.country && <ErrorMessage message={errors.newAddress.country.message} />}
        </section>
        <Controller
          control={control}
          name="defaultAddress"
          render={({ field: { onChange, value } }) => (
            <InputCheckBox
              onChange={onChange}
              id="shippingAndBilling"
              name="shippingAndBilling"
              label="Set Address as default"
              isValue={value}
            />
          )}
        />
        <button type="submit" className="button-primary" disabled={!isDirty || !isValid || isSubmitting}>
          New Address
        </button>
      </form>
    </ModalProfile>
  );
}
