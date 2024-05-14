import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './_loginform.module.scss';
import Input from '../ui/input/input';
import InputPassword from '../ui/inputPassword/inputPassword';
import ErrorMessage from '../errorMessage/ErrorMessage';
import FormTitle from '../formTitle/FormTitle';
import { useLoginData } from '../../core/state/loginState';
import { getInputProps } from '../../utils/utils';
import { EMAIL_VALIDATION_SCHEMA, PASSWORD_VALIDATION_SCHEMA, ROUTES } from '../../constants/constants';

const schema = z.object({
  email: EMAIL_VALIDATION_SCHEMA,
  password: PASSWORD_VALIDATION_SCHEMA,
});

type LoginFormValues = z.infer<typeof schema>;

export default function LoginForm(): JSX.Element {
  const { setValueEmail, setValuePassword } = useLoginData();
  const { register, handleSubmit, formState, reset } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const { errors } = formState;

  const inputEmailProps = getInputProps('email', 'email', 'Type email address here', 'email');
  const inputPasswordProps = getInputProps('password', 'password', 'Create a strong password', 'off');

  const onSubmit = (data: LoginFormValues): void => {
    setValueEmail(data.email.toLowerCase());
    setValuePassword(data.password);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['login-form']} data-testid="login-form" noValidate>
      <FormTitle title="Login" />
      <section className={styles['input-section']}>
        <Input
          inputProps={{
            ...register('email'),
            ...inputEmailProps,
          }}
          label="E-mail "
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
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
      </section>
      <button type="submit" className={styles['button-primary']}>
        Login Your Account
      </button>
      <section>
        <p>Don’t have an account?</p>
        <Link to={ROUTES.SING_UP} className={styles.link}>
          Sign Up
        </Link>
      </section>
    </form>
  );
}
