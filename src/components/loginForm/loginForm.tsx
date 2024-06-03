import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './_loginform.module.scss';
import Input from '../ui/input/input';
import InputPassword from '../ui/inputPassword/inputPassword';
import ErrorMessage from '../errorMessage/ErrorMessage';
import FormTitle from '../formTitle/FormTitle';
import { useLoginData } from '../../core/state/loginState';
import { getInputProps, handleLoginError } from '../../utils/utils';
import { EMAIL_VALIDATION_SCHEMA, LS_PREFIX, PASSWORD_VALIDATION_SCHEMA, ROUTES } from '../../constants/constants';
import { Api, api } from '../../api/Api';

import type { ErrorLoginForm } from '../../utils/utils';
import type { ClientResponse, CustomerPagedQueryResponse } from '@commercetools/platform-sdk';

const schema = z.object({
  email: EMAIL_VALIDATION_SCHEMA,
  password: PASSWORD_VALIDATION_SCHEMA,
});

type LoginFormValues = z.infer<typeof schema>;

export default function LoginForm(): JSX.Element {
  const { setCustomerCredentials } = useLoginData();
  const { register, handleSubmit, formState, reset, watch } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const { errors, isDirty, isValid, isSubmitting } = formState;
  const navigate = useNavigate();

  const [formEmailError, setFormEmailError] = useState<string>('');
  const [formPasswordError, setFormPasswordError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const inputEmailProps = getInputProps('text', 'email', 'Enter your email', 'email');
  const inputPasswordProps = getInputProps('password', 'password', 'Enter your password', 'off');

  const valueEmail = watch('email');
  const valuePassword = watch('password');

  useEffect(() => {
    setFormEmailError('');
    setFormError('');
  }, [valueEmail]);

  useEffect(() => {
    setFormPasswordError('');
    setFormError('');
  }, [valuePassword]);

  const onSubmit = (data: LoginFormValues): void => {
    api
      .loginUser(data.email.toLowerCase(), data.password)
      .then((response) => {
        const customerCredentials = {
          valueEmail: response.body.customer.email,
          valuePassword: data.password,
          isAuth: true,
          customerId: response.body.customer.id,
        };
        setCustomerCredentials(customerCredentials);
        localStorage.setItem(`isAuth-${LS_PREFIX}`, customerCredentials.isAuth.toString());
        localStorage.setItem(`customerId-${LS_PREFIX}`, customerCredentials.customerId.toString());
        api.switchToPasswordFlow(data.email.toLowerCase(), data.password);
        // api.getAllProduct().catch((error: Error) => {
        //   console.log(error.message);
        // });
        reset();
      })
      .catch(async () => {
        setFormEmailError('');
        setFormPasswordError('');
        setFormError('');
        const isUserByEmailResponse: ClientResponse<CustomerPagedQueryResponse> | undefined =
          await Api.getCustomerByEmail(data.email.toLowerCase());

        if (isUserByEmailResponse) {
          const errorResponse: ErrorLoginForm = handleLoginError(isUserByEmailResponse.body.count);

          if ('isEmail' in errorResponse.error) {
            setFormEmailError(errorResponse.error.message);
          }

          if ('isPassword' in errorResponse.error) {
            setFormPasswordError(errorResponse.error.message);
          }

          if ('isForm' in errorResponse.error) {
            setFormError(errorResponse.error.message);
          }
        }
      });
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
      <button type="submit" className="button-primary" disabled={!isDirty || !isValid || isSubmitting}>
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
