import { useForm } from 'react-hook-form';
// import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import style from './_registrationForm.module.scss';
import Input from '../../../components/ui/input/input';
// import InputCheckBox from '../../../components/ui/checkbox/checkbox';
import FormTitle from '../../../components/formTitle/FormTitle';
import { getInputProps } from '../../../utils/utils';
import { EMAIL_VALIDATION_SCHEMA, PASSWORD_VALIDATION_SCHEMA } from '../../../constants/constants';
import ErrorMessage from '../../../components/errorMessage/ErrorMessage';
// import { useLoginData } from '../../../core/state/loginState';
// import FormSubTitle from '../../../components/formSubTitle/formSubTitle';

const schema = z.object({
  email: EMAIL_VALIDATION_SCHEMA,
  password: PASSWORD_VALIDATION_SCHEMA,
});

type LoginFormValues = z.infer<typeof schema>;

export default function RegistrationForm(): JSX.Element {
  const { register, formState } = useForm<LoginFormValues>({ resolver: zodResolver(schema) });
  const { errors } = formState;

  const inputEmailProps = getInputProps('email', 'email', 'Type email address here', 'email');
  const inputPasswordProps = getInputProps('password', 'password', 'Create a strong password', 'off');
  // const { setValueEmail, setValuePassword } = useLoginData();

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setValueEmail(e.target.value);
  // };

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setValuePassword(e.target.value);
  // };

  // const options = [
  //   'USA', 'Canada'
  // ];

  return (
    <form className={style['registration-form']} data-testid="registration">
      <FormTitle title="Register" />
      <div className={style['form-group']}>
        {' '}
        <Input
          inputProps={{
            ...register('email'),
            ...inputEmailProps,
          }}
          label="E-mail "
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
        <Input
          inputProps={{
            ...register('password'),
            ...inputPasswordProps,
          }}
          label="Password "
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>
      {/* <FormSubTitle subTitle="Personal Info" />
       <div className={style['form-group']}> <Input
        type="firstName"
        id="firstName"
        name="firstName"
        placeholder="Your First Name"
        label="First Name "
        autocomplete="firstName"
        onChange={handleEmailChange}
      />
      <Input
        type="lastName"
        id="lastName"
        name="lastName"
        placeholder="Your Last Name"
        label="Last Name "
        autocomplete="lastName"
        onChange={handlePasswordChange}
      />
       <Input
        type="calendar"
        id="calendar"
        name="calendar"
        placeholder="01.01.1990"
        label="Date of Birth "
        autocomplete="off"
        onChange={handlePasswordChange}
      /></div>
        <FormSubTitle subTitle="Main Address" />
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
