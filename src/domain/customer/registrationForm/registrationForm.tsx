import { Controller, useForm } from 'react-hook-form';
// import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';

import icon from '../../../assets/images/icons/icon-calendar.svg';
import style from './_registrationForm.module.scss';
import Input from '../../../components/ui/input/input';
import InputCheckBox from '../../../components/ui/checkbox/checkbox';
import FormTitle from '../../../components/formTitle/FormTitle';
import { getInputProps } from '../../../utils/utils';
import {
  DATE_VALIDATION_SCHEMA,
  EMAIL_VALIDATION_SCHEMA,
  FIRST_NAME_VALIDATION_SCHEMA,
  LAST_NAME_VALIDATION_SCHEMA,
  PASSWORD_VALIDATION_SCHEMA,
  STREET_VALIDATION_SCHEMA,
  CITY_VALIDATION_SCHEMA,
  POSTALCODE_VALIDATION_SCHEMA,
  COUNTRY_VALIDATION_SCHEMA,
} from '../../../constants/constants';
import ErrorMessage from '../../../components/errorMessage/ErrorMessage';
// import { useLoginData } from '../../../core/state/loginState';
import FormSubTitle from '../../../components/formSubTitle/formSubTitle';
import CalendarLabel from '../../../components/ui/calendarLabel/label';

const schema = z.object({
  email: EMAIL_VALIDATION_SCHEMA,
  password: PASSWORD_VALIDATION_SCHEMA,
  firstName: FIRST_NAME_VALIDATION_SCHEMA,
  lastName: LAST_NAME_VALIDATION_SCHEMA,
  dateOfBirth: DATE_VALIDATION_SCHEMA,
  mainAddress: z.object({
    street: STREET_VALIDATION_SCHEMA,
    city: CITY_VALIDATION_SCHEMA,
    postalCode: POSTALCODE_VALIDATION_SCHEMA,
    country: COUNTRY_VALIDATION_SCHEMA,
  }),
});

type RegistrationFormValues = z.infer<typeof schema>;

export default function RegistrationForm(): JSX.Element {
  // const { setValueEmail, setValuePassword } = useLoginData();
  const { control, register, handleSubmit, formState, reset } = useForm<RegistrationFormValues>({
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const inputEmailProps = getInputProps('email', 'email', 'Type email address here', 'email');
  const inputPasswordProps = getInputProps('password', 'password', 'Create a strong password', 'off');
  const inputFirstNameProps = getInputProps('firstName', 'firstName', 'Your First Name', 'off');
  const inputLastNameProps = getInputProps('lastName', 'lastName', 'Your Last Name', 'off');
  const inputStreetProps = getInputProps('street', 'street', 'Street', 'off');
  const inputCityProps = getInputProps('city', 'city', 'City', 'off');
  const inputPostalCodeProps = getInputProps('postal-code', 'postal-code', 'M5V1J1', 'off');

  const onSubmit = (data: RegistrationFormValues): void => {
    console.log(data);
    // setValueEmail(data.email.toLowerCase());
    // setValuePassword(data.password);
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
          <CalendarLabel
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
      <FormSubTitle subTitle="Main Address" />
      <div className={style['form-group']}>
      <section className={style['input-section']}>
        <Input
          inputProps={{
            ...register('mainAddress.street'),
            ...inputStreetProps,
          }}
          label="Street "
        />
        {errors.mainAddress && errors.mainAddress.street && (
          <ErrorMessage message={errors.mainAddress.street.message} />
        )}
          </section>
         <section className={style['input-section']}>
        <Input
          inputProps={{
            ...register('mainAddress.city'),
            ...inputCityProps,
          }}
          label="City "
        />
        {errors.mainAddress && errors.mainAddress.city && <ErrorMessage message={errors.mainAddress.city.message} />}
        </section>
        <section className={style['input-section']}>
        <Input
          inputProps={{
            ...register('mainAddress.postalCode'),
            ...inputPostalCodeProps,
          }}
          label="Postal Code "
        />
        {errors.mainAddress && errors.mainAddress.postalCode && (
          <ErrorMessage message={errors.mainAddress.postalCode.message} />
        )}
        </section>
         <section className={style['input-section']}> 
         <CalendarLabel
            control={
              <Controller
              control={control}
              name="mainAddress.country"
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  value={value}
                  className={style['select-country']}
                  placeholder="Select Country"
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
          {errors.mainAddress && errors.mainAddress.country && (
          <ErrorMessage message={errors.mainAddress.country.message} />
        )}
        </section>
      </div>
      <InputCheckBox
        id="default"
        name="default"
        label="Set as default address for shipping & billing "
        // onChange={handlePasswordChange}
      />

      {/* <FormSubTitle subTitle="Main Address" />
        <div className={style['form-group']}> <Input
        type="street"
        id="street"
        name="street"
        placeholder="Street "
        label="Street "
        autocomplete="street"
        onChange={handleEmailChange}
      />
      <Input
        type="city"
        id="city"
        name="city"
        placeholder="City"
        label="City "
        autocomplete="city"
        onChange={handlePasswordChange}
      />
       <Input
        type="postal-code"
        id="postal-code"
        name="postal-code"
        placeholder="123 456"
        label="Postal Code "
        autocomplete="off"
        onChange={handlePasswordChange}
      />
        <Input
        type="country"
        id="country"
        name="country"
        placeholder="Select Country"
        label="Country "
        autocomplete="off"
        onChange={handlePasswordChange}
      /></div>    
      <InputCheckBox
        id="default"
        name="default"
        label="Set as default address for shipping & billing "
        onChange={handlePasswordChange}
      />
        <FormSubTitle subTitle="Shipping Address" />
        <div className={style['form-group']}> <Input
        type="street"
        id="street"
        name="street"
        placeholder="Street "
        label="Street "
        autocomplete="street"
        onChange={handleEmailChange}
      />
      <Input
        type="city"
        id="city"
        name="city"
        placeholder="City"
        label="City "
        autocomplete="city"
        onChange={handlePasswordChange}
      />
       <Input
        type="postal-code"
        id="postal-code"
        name="postal-code"
        placeholder="123 456"
        label="Postal Code "
        autocomplete="off"
        onChange={handlePasswordChange}
      />
        <Input
        type="country"
        id="country"
        name="country"
        placeholder="Select Country"
        label="Country "
        autocomplete="off"
        onChange={handlePasswordChange}
      /></div>
          <InputCheckBox
        id="default"
        name="default"
        label="Set as billing address "
        onChange={handlePasswordChange}
      />
        <FormSubTitle subTitle="Billing Address" />
        <div className={style['form-group']}> <Input
        type="street"
        id="street"
        name="street"
        placeholder="Street "
        label="Street "
        autocomplete="street"
        onChange={handleEmailChange}
      />
      <Input
        type="city"
        id="city"
        name="city"
        placeholder="City"
        label="City "
        autocomplete="city"
        onChange={handlePasswordChange}
      />
       <Input
        type="postal-code"
        id="postal-code"
        name="postal-code"
        placeholder="123 456"
        label="Postal Code "
        autocomplete="off"
        onChange={handlePasswordChange}
      />
        <Input
        type="country"
        id="country"
        name="country"
        placeholder="Select Country"
        label="Country "
        autocomplete="off"
        onChange={handlePasswordChange}
      /></div>
        <InputCheckBox
        id="default"
        name="default"
        label="Set as shipping address "
        onChange={handlePasswordChange}
      /> */}

      <button type="submit">Create Your Account</button>
      <section>
        <p>Already have an account?</p>
        <p>Login</p>
      </section>
    </form>
  );
}
