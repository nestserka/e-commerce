import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import style from './_loginform.module.scss';
import Input from '../ui/input/input';
import ErrorMessage from '../errorMessage/ErrorMessage';
import FormTitle from '../formTitle/FormTitle';
import { useLoginData } from '../../core/state/loginState';
import { getInputProps } from '../../utils/utils';
import { EMAIL_VALIDATION_SCHEMA, PASSWORD_VALIDATION_SCHEMA } from '../../constants/constants';

const schema = z.object({
  email: EMAIL_VALIDATION_SCHEMA,
  password: PASSWORD_VALIDATION_SCHEMA,
});

type LoginFormValues = z.infer<typeof schema>;

export default function LoginForm(): JSX.Element {
  const { setValueEmail, setValuePassword } = useLoginData();
  const { register, handleSubmit, formState, reset } = useForm<LoginFormValues>({ resolver: zodResolver(schema) });
  const { errors } = formState;

  const inputEmailProps = getInputProps('email', 'email', 'Type email address here', 'email');
  const inputPasswordProps = getInputProps('password', 'password', 'Create a strong password', 'off');

  const onSubmit = (data: LoginFormValues): void => {
    setValueEmail(data.email.toLowerCase());
    setValuePassword(data.password);
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style['login-form']} data-testid="login-form" noValidate>
      <FormTitle title="Login" />
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
      <button type="submit">Login Your Account</button>
      <section>
        <p>Don’t have an account?</p>
        <p>Sign Up</p>
      </section>
    </form>
  );
}
