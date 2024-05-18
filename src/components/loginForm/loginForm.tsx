import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './_loginform.module.scss';
import Input from '../ui/input/input';
import InputPassword from '../ui/inputPassword/inputPassword';
import ErrorMessage from '../errorMessage/ErrorMessage';
import FormTitle from '../formTitle/FormTitle';
import { useLoginData } from '../../core/state/loginState';
import { getInputProps } from '../../utils/utils';
import { EMAIL_VALIDATION_SCHEMA, LS_PREFIX, PASSWORD_VALIDATION_SCHEMA, ROUTES } from '../../constants/constants';
import { api } from '../../api/Api';

const schema = z.object({
  email: EMAIL_VALIDATION_SCHEMA,
  password: PASSWORD_VALIDATION_SCHEMA,
});

type LoginFormValues = z.infer<typeof schema>;

export default function LoginForm(): JSX.Element {
  const { setCustomerCredentials } = useLoginData();
  const { register, handleSubmit, formState, reset } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const { errors } = formState;
  const navigate = useNavigate();

  const [formEmailError, setFormEmailError] = useState<string>('');
  const [formPasswordError, setFormPasswordError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const inputEmailProps = getInputProps('email', 'email', 'Type email address here', 'email');
  const inputPasswordProps = getInputProps('password', 'password', 'Create a strong password', 'off');

  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    setFormEmailError('');
    setFormPasswordError('');
    setFormError('');

    const response = await api.loginUser(data.email.toLowerCase(), data.password);

    if ('error' in response) {
      if ('isEmail' in response.error) {
        setFormEmailError(response.error.message);
      }

      if ('isPassword' in response.error) {
        setFormPasswordError(response.error.message);
      }

      if ('isForm' in response.error) {
        setFormError(response.error.message);
      }
    } else {
      const customerCredentials = {
        valueEmail: response.body.customer.email,
        valuePassword: data.password,
        isAuth: true,
        customerId: response.body.customer.id,
      };
      setCustomerCredentials(customerCredentials);
      localStorage.setItem(`isAuth-${LS_PREFIX}`, customerCredentials.isAuth.toString());
      localStorage.setItem(`customerId-${LS_PREFIX}`, customerCredentials.customerId.toString());
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['login-form']} data-testid="login-form" noValidate>
      <FormTitle title="Login" />
      {formError && <ErrorMessage message={formError} />}
      <section className={styles['input-section']}>
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
      <section className={styles['input-section']}>
        <InputPassword
          inputProps={{
            ...register('password'),
            ...inputPasswordProps,
          }}
          label="Password "
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
        {formPasswordError && <ErrorMessage message={formPasswordError} />}
      </section>
      <button type="submit" className="button-primary">
        Login Your Account
      </button>
      <section>
        <p>Don’t have an account?</p>
        <button
          className="button-link"
          aria-label="button"
          type="button"
          onClick={() => {
            navigate(ROUTES.SING_UP);
          }}
        >
          Sign Up
        </button>
      </section>
    </form>
  );
}
