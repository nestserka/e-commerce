import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import icon from '../../../assets/images/icons/icon-calendar.svg';
import style from './_registrationForm.module.scss';
import Input from '../../../components/ui/input/input';
import InputCheckBox from '../../../components/ui/checkbox/checkbox';
import FormTitle from '../../../components/formTitle/FormTitle';
import {
  inputBillingCityProps,
  inputBillingPostalCodeProps,
  inputBillingStreetProps,
  inputEmailProps,
  inputFirstNameProps,
  inputLastNameProps,
  inputPasswordProps,
  inputShippingCityProps,
  inputShippingPostalCodeProps,
  inputShippingStreetProps,
} from '../../../utils/inputProps';
import {
  ADDRESS_VALIDATION_SCHEMA,
  DATE_VALIDATION_SCHEMA,
  EMAIL_VALIDATION_SCHEMA,
  FIRST_NAME_VALIDATION_SCHEMA,
  LAST_NAME_VALIDATION_SCHEMA,
  LS_PREFIX,
  PASSWORD_VALIDATION_SCHEMA,
  ROUTES,
} from '../../../constants/constants';
import ErrorMessage from '../../../components/errorMessage/ErrorMessage';
import FormSubTitle from '../../../components/formSubTitle/formSubTitle';
import ControllerLabel from '../../../components/ui/controllerLabel/label';
import { useAddressAutoComplete } from '../../../utils/checkbox-autocomplete';
import RegistrationData from '../../../core/state/registrationState';
import InputPassword from '../../../components/ui/inputPassword/inputPassword';
import { showModalMessage, useCustomerInfo, useLoginData } from '../../../core/state/userState';
import createCustomer from '../../../api/customer/createCustomer';

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
  const { control, register, handleSubmit, formState, reset, setValue, watch, trigger } =
    useForm<RegistrationFormValues>({
      resolver: zodResolver(schema),
      mode: 'onChange',
    });
  const { errors, isDirty, isValid, isSubmitting } = formState;
  const [isShippingCompleteChecked, setShippingCompleteChecked] = useState(false);
  const [formEmailError, setFormEmailError] = useState<string>('');
  const { setCustomerCredentials } = useLoginData();
  const { setUpdatedGeneraValues } = useCustomerInfo();

  const shippingAddress = useWatch({
    control,
    name: 'shippingAddress',
  });

  const valueEmail = watch('email');

  useEffect(() => {
    setFormEmailError('');
  }, [valueEmail]);

  const handleShippingAutoComplete = useAddressAutoComplete(
    shippingAddress,
    isShippingCompleteChecked,
    setValue,
    setShippingCompleteChecked,
    'billing',
  );

  useEffect(() => {
    const subscription = watch((_value, { name }) => {
      if (name === 'shippingAddress.country') {
        trigger(['shippingAddress.postalCode']).catch((error) => {
          console.error('Error triggering shippingAddress.postalCode:', error);
        });
      }

      if (name === 'billingAddress.country') {
        trigger(['billingAddress.postalCode']).catch((error) => {
          console.error('Error triggering billingAddress.postalCode:', error);
        });
      }
    });

    return (): void => {
      subscription.unsubscribe();
    };
  }, [watch, trigger]);

  const { setIsShown } = showModalMessage();

  const onSubmit = async (data: RegistrationFormValues): Promise<void> => {
    setShippingCompleteChecked(false);
    const registrationData = new RegistrationData();
    registrationData.setEmail(data.email);
    registrationData.setPassword(data.password);
    registrationData.setFirstName(data.firstName);
    registrationData.setLastName(data.lastName);
    registrationData.setDateOfBirth(data.dateOfBirth);
    registrationData.addAddress([data.shippingAddress, data.billingAddress]);
    registrationData.setShippingAddressIds([0]);
    registrationData.setBillingAddressIds([1]);

    if (data.defaultShippingAddress) {
      registrationData.setDefaultShippingAddress(0);
    }

    if (data.defaultBillingAddress) {
      registrationData.setDefaultBillingAddress(1);
    }

    await createCustomer(registrationData.getState())
      .then((response) => {
        const customerCredentials = {
          valueEmail: response.email,
          valuePassword: data.password,
          isAuth: true,
          customerId: response.id,
        };
        setCustomerCredentials(customerCredentials);
        setUpdatedGeneraValues({ firstName: data.firstName });
        localStorage.setItem(`isAuth-${LS_PREFIX}`, customerCredentials.isAuth.toString());
        localStorage.setItem(`customerId-${LS_PREFIX}`, customerCredentials.customerId.toString());
        reset();
        setIsShown(true);
      })
      .catch((error: Error) => {
        setFormEmailError(error.message);
      });
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
          {formEmailError && <ErrorMessage message={formEmailError} />}
        </section>
        <section className={style['input-section']}>
          <InputPassword
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
                    allowClear={false}
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
                    popupMatchSelectWidth={false}
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
          <InputCheckBox onChange={onChange} id="shipping" name="shipping" label="Set Shipping Address as default" isValue={value} />
        )}
      />
      <InputCheckBox id="main" name="main" label="Bill to Shipping Address " onChange={handleShippingAutoComplete}/>
      <FormSubTitle subTitle="Billing Address" />
      <div className={style['form-group']}>
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('billingAddress.streetName'),
              ...inputBillingStreetProps,
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
              ...inputBillingCityProps,
            }}
            label="City "
            isDisabled={isShippingCompleteChecked}
          />
          {errors.billingAddress?.city && <ErrorMessage message={errors.billingAddress.city.message} />}
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
                    popupMatchSelectWidth={false}
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
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('billingAddress.postalCode'),
              ...inputBillingPostalCodeProps,
            }}
            label="Postal Code "
            isDisabled={isShippingCompleteChecked}
          />
          {errors.billingAddress?.postalCode && <ErrorMessage message={errors.billingAddress.postalCode.message} />}
        </section>
      </div>
      <Controller
        control={control}
        name="defaultBillingAddress"
        render={({ field: { onChange, value } }) => (
          <InputCheckBox onChange={onChange} id="billing" name="billing" label="Set Billing Address as default" isValue={value} />
        )}
      />
      <button
        type="submit"
        className="button-primary button-registration"
        disabled={!isDirty || !isValid || isSubmitting}
      >
        Create Your Account
      </button>
      <section>
        <p>Already have an account?</p>
        <Link to={ROUTES.SING_IN}>Sign In</Link>
      </section>
    </form>
  );
}
