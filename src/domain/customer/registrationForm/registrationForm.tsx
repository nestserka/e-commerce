import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import icon from '../../../assets/images/icons/icon-calendar.svg';
import style from './_registrationForm.module.scss';
import Input from '../../../components/ui/input/input';
import InputCheckBox from '../../../components/ui/checkbox/checkbox';
import FormTitle from '../../../components/formTitle/FormTitle';
import {
  inputCityProps,
  inputEmailProps,
  inputFirstNameProps,
  inputLastNameProps,
  inputPasswordProps,
  inputPostalCodeProps,
  inputStreetProps,
} from '../../../utils/inputProps';
import {
  ADDRESS_VALIDATION_SCHEMA,
  DATE_VALIDATION_SCHEMA,
  EMAIL_VALIDATION_SCHEMA,
  FIRST_NAME_VALIDATION_SCHEMA,
  LAST_NAME_VALIDATION_SCHEMA,
  PASSWORD_VALIDATION_SCHEMA,
  ROUTES,
} from '../../../constants/constants';
import ErrorMessage from '../../../components/errorMessage/ErrorMessage';
import FormSubTitle from '../../../components/formSubTitle/formSubTitle';
import ControllerLabel from '../../../components/ui/controllerLabel/label';
import { useAddressAutoComplete } from '../../../utils/checkbox-autocomplete';
import { useRegistrationData } from '../../../core/state/registrationState';

const schema = z.object({
  email: EMAIL_VALIDATION_SCHEMA,
  password: PASSWORD_VALIDATION_SCHEMA,
  firstName: FIRST_NAME_VALIDATION_SCHEMA,
  lastName: LAST_NAME_VALIDATION_SCHEMA,
  dateOfBirth: DATE_VALIDATION_SCHEMA,
  shippingAddress: ADDRESS_VALIDATION_SCHEMA,
  billingAddress: ADDRESS_VALIDATION_SCHEMA,
  defaultShippingAddress: z.boolean().optional(),
  defaultBillingAddress: z.boolean().optional(),
});

export type RegistrationFormValues = z.infer<typeof schema>;

export default function RegistrationForm(): JSX.Element {
  const { control, register, handleSubmit, formState, reset, setValue } = useForm<RegistrationFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const { errors } = formState;
  const [isShippingCompleteChecked, setShippingCompleteChecked] = useState(false);
  const {
    setEmail,
    setPassword,
    setFirstName,
    setLastName,
    setDateOfBirth,
    addAddress,
    setDefaultBillingAddress,
    setDefaultShippingAddress,
    createCustomer,
  } = useRegistrationData();

  const shippingAddress = useWatch({
    control,
    name: 'shippingAddress',
  });

  const handleShippingAutoComplete = useAddressAutoComplete(
    shippingAddress,
    isShippingCompleteChecked,
    setValue,
    setShippingCompleteChecked,
    'billing',
  );

  const onSubmit = (data: RegistrationFormValues): void => {
    setEmail(data.email.toLowerCase());
    setPassword(data.password);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setDateOfBirth(data.dateOfBirth);
    addAddress([data.shippingAddress, data.billingAddress]);
    setShippingCompleteChecked(false);

    if (data.defaultShippingAddress) {
      setDefaultShippingAddress(0);
    }

    if (data.defaultBillingAddress) {
      setDefaultBillingAddress(1);
    }

    createCustomer(useRegistrationData.getState()).catch((error) => {
      console.error('Error creating customer:', error);
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={style['registration-form']}
      data-testid="registration"
      noValidate
    >
      <FormTitle title="Register" />
      <div className={style['form-group']}>
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('email'),
              ...inputEmailProps,
            }}
            label="E-mail "
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </section>
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('password'),
              ...inputPasswordProps,
            }}
            label="Password "
          />
          {errors.password && <ErrorMessage message={errors.password.message} />}
        </section>
      </div>
      <FormSubTitle subTitle="Personal Info" />
      <div className={style['form-group']}>
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('firstName'),
              ...inputFirstNameProps,
            }}
            label="First Name "
          />
          {errors.firstName && <ErrorMessage message={errors.firstName.message} />}
        </section>
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('lastName'),
              ...inputLastNameProps,
            }}
            label="Your Last Name "
          />
          {errors.lastName && <ErrorMessage message={errors.lastName.message} />}
        </section>
        <section className={style['input-section']}>
          <ControllerLabel
            control={
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    onChange={onChange}
                    format="DD.MM.YYYY"
                    value={value}
                    className={style['date-picker']}
                    placeholder="13.03.1990"
                    minDate={dayjs('01.01.1900', 'DD.MM.YYYY')}
                    suffixIcon={<img src={icon} alt="icon" />}
                  />
                )}
              />
            }
            label="Date of Birth "
          />
          {errors.dateOfBirth && <ErrorMessage message={errors.dateOfBirth.message} />}
        </section>
      </div>
      <FormSubTitle subTitle="Shipping Address" />
      <div className={style['form-group']}>
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('shippingAddress.streetName'),
              ...inputStreetProps,
            }}
            label="Street "
          />
          {errors.shippingAddress?.streetName && <ErrorMessage message={errors.shippingAddress.streetName.message} />}
        </section>
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('shippingAddress.city'),
              ...inputCityProps,
            }}
            label="City "
          />
          {errors.shippingAddress?.city && <ErrorMessage message={errors.shippingAddress.city.message} />}
        </section>
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('shippingAddress.postalCode'),
              ...inputPostalCodeProps,
            }}
            label="Postal Code "
          />
          {errors.shippingAddress?.postalCode && <ErrorMessage message={errors.shippingAddress.postalCode.message} />}
        </section>
        <section className={style['input-section']}>
          <ControllerLabel
            control={
              <Controller
                control={control}
                name="shippingAddress.country"
                render={({ field: { onChange, value } }) => (
                  <Select
                    onChange={onChange}
                    value={value}
                    className={style['select-country']}
                    defaultValue="Select Country"
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
      </div>
      <Controller
        control={control}
        name="defaultShippingAddress"
        render={({ field: { onChange } }) => (
          <InputCheckBox onChange={onChange} id="shipping" name="shipping" label="Set Shipping Address as default" />
        )}
      />
       <InputCheckBox
        id="main"
        name="main"
        label="Bill to Shipping Address "
        onChange={handleShippingAutoComplete}
      />
      <FormSubTitle subTitle="Billing Address" />
      <div className={style['form-group']}>
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('billingAddress.streetName'),
              ...inputStreetProps,
            }}
            label="Street "
            isDisabled={isShippingCompleteChecked}
          />
          {errors.billingAddress?.streetName && <ErrorMessage message={errors.billingAddress.streetName.message} />}
        </section>
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('billingAddress.city'),
              ...inputCityProps,
            }}
            label="City "
            isDisabled={isShippingCompleteChecked}
          />
          {errors.billingAddress?.city && <ErrorMessage message={errors.billingAddress.city.message} />}
        </section>
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('billingAddress.postalCode'),
              ...inputPostalCodeProps,
            }}
            label="Postal Code "
            isDisabled={isShippingCompleteChecked}
          />
          {errors.billingAddress?.postalCode && <ErrorMessage message={errors.billingAddress.postalCode.message} />}
        </section>
        <section className={style['input-section']}>
          <ControllerLabel
            control={
              <Controller
                control={control}
                name="billingAddress.country"
                render={({ field: { onChange, value } }) => (
                  <Select
                    onChange={onChange}
                    value={value}
                    className={style['select-country']}
                    defaultValue="Select Country"
                    options={[
                      { value: 'US', label: 'United States' },
                      { value: 'CA', label: 'Canada' },
                    ]}
                    disabled={isShippingCompleteChecked}
                  />
                )}
              />
            }
            label="Country  "
          />
          {errors.billingAddress?.country && <ErrorMessage message={errors.billingAddress.country.message} />}
        </section>
      </div>
      <Controller
        control={control}
        name="defaultBillingAddress"
        render={({ field: { onChange } }) => (
          <InputCheckBox onChange={onChange} id="billing" name="billing" label="Set Billing Address as default" />
        )}
      />
      <button type="submit">Create Your Account</button>
      <section>
        <p>Already have an account?</p>
        <Link to={ROUTES.SING_IN}>Sign In</Link>
      </section>
    </form>
  );
}
