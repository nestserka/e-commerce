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
  inputShippingCityProps,
  inputShippingPostalCodeProps,
  inputShippingStreetProps,
} from '../../../../utils/inputProps';
import ControllerLabel from '../../../../components/ui/controllerLabel/label';
import InputCheckBox from '../../../../components/ui/checkbox/checkbox';
import updateCustomer from '../../../../api/me/updateCustomer';

import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';

const schema = z.object({
  shippingAddress: ADDRESS_VALIDATION_SCHEMA,
  defaultShippingAddress: z.boolean().optional(),
});

export type ShippingFormValues = z.infer<typeof schema>;

export default function ShippingAddressForm({ isOpen, onClose, shippingAddressId }: FormModal): JSX.Element {
  const { shippingAddress, version, updateAddress, setDefault } = useCustomerInfo();
  console.log(`${shippingAddressId}T`);
  const address = shippingAddress.find((addr) => addr.id === shippingAddressId);
  console.log(address);
  const { setErrorIsShown } = showErrorMessage();

  const { register, handleSubmit, formState, reset, control, watch, trigger } = useForm<ShippingFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      shippingAddress: {
        streetName: address?.streetName ?? '',
        city: address?.city ?? '',
        postalCode: address?.postalCode ?? '',
        country: address?.country ?? 'Select Country',
      },
      defaultShippingAddress: address?.isDefault ?? false,
    },
  });

  const { errors, isDirty, isValid, isSubmitting } = formState;
  const { setIsShown } = showModalMessage();
  const [formError, setFormError] = useState<string>('');

  useEffect(() => {
    const subscription = watch((_value, { name }) => {
      if (name === 'shippingAddress.country') {
        trigger(['shippingAddress.postalCode']).catch((error: Error) => {
          console.error('Error triggering shippingAddress.postalCode:', error);
        });
      }
    });

    return (): void => {
      subscription.unsubscribe();
    };
  }, [watch, trigger]);

  const onSubmit = async (data: ShippingFormValues): Promise<void> => {
    const body: MyCustomerUpdateAction[] = [
      {
        action: 'changeAddress',
        addressId: shippingAddressId,
        address: data.shippingAddress,
      },
    ];
    await updateCustomer(version, body)
      .then(async (response) => {
        const updatedAddress = response.addresses.find((addr) => addr.id === shippingAddressId);

        if (updatedAddress && shippingAddressId) {
          updateAddress(shippingAddressId, updatedAddress, response.version, 'shipping');
          console.log();
        }

        if (address?.isDefault !== data.defaultShippingAddress && shippingAddressId) {
          console.log('iamhere');

          if (data.defaultShippingAddress) {
            const setDefaultAddress: MyCustomerUpdateAction[] = [
              {
                action: 'setDefaultShippingAddress',
                addressId: shippingAddressId,
              },
            ];
            await updateCustomer(response.version, setDefaultAddress).then((res) => {
              setDefault(shippingAddressId, res.version, true, 'shipping');
            });
          } else {
            const removeDefaultAddress: MyCustomerUpdateAction[] = [
              {
                action: 'removeShippingAddressId',
                addressId: shippingAddressId,
              },
              {
                action: 'addShippingAddressId',
                addressId: shippingAddressId,
              },
            ];
            await updateCustomer(response.version, removeDefaultAddress).then((resp) => {
              setDefault(shippingAddressId, resp.version, false, 'shipping');
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
        <FormTitle title="Edit Shipping Address" isIcon={false} />
        {formError && <ErrorMessage message={formError} />}
        <div className={style['form-group']}>
          <section className={style['input-section']}>
            <Input
              inputProps={{
                ...register('shippingAddress.streetName'),
                ...inputShippingStreetProps,
              }}
              label="Street "
            />
            {errors.shippingAddress?.streetName && <ErrorMessage message={errors.shippingAddress.streetName.message} />}
          </section>
          <section className={style['input-section']}>
            <Input
              inputProps={{
                ...register('shippingAddress.city'),
                ...inputShippingCityProps,
              }}
              label="City "
            />
            {errors.shippingAddress?.city && <ErrorMessage message={errors.shippingAddress.city.message} />}
          </section>
        </div>
        <div className={style['form-group']}>
          <section className={style['input-section']}>
            <ControllerLabel
              control={
                <Controller
                  control={control}
                  name="shippingAddress.country"
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
            {errors.shippingAddress?.country && <ErrorMessage message={errors.shippingAddress.country.message} />}
          </section>
          <section className={style['input-section']}>
            <Input
              inputProps={{
                ...register('shippingAddress.postalCode'),
                ...inputShippingPostalCodeProps,
              }}
              label="Postal Code "
            />
            {errors.shippingAddress?.postalCode && <ErrorMessage message={errors.shippingAddress.postalCode.message} />}
          </section>
        </div>
        <Controller
          control={control}
          name="defaultShippingAddress"
          render={({ field: { onChange, value } }) => (
            <InputCheckBox
              onChange={onChange}
              id="shipping"
              name="shipping"
              label="Set Shipping Address as default"
              isValue={value}
            />
          )}
        />
        <button type="submit" className="button-primary" disabled={!isDirty || !isValid || isSubmitting}>
          Change Shipping Address
        </button>
      </form>
    </ModalProfile>
  );
}
