import style from './_loginform.module.scss';
import FormTitle from '../formTitle/FormTitle';
import { useLoginData } from '../../core/state/loginState';
import { useForm } from 'react-hook-form';
import LoginFormValues from './types';
import Input from '../ui/input/input';
import ErrorMessage from '../errorMessage/ErrorMessage';

export default function LoginForm(): JSX.Element {
  const { setValueEmail, setValuePassword } = useLoginData();
  const { register, handleSubmit, formState } = useForm<LoginFormValues>();
  const { errors } = formState;

  // const handleInputChange =
  //   (setValue: (value: string) => void) =>
  //   (e: React.ChangeEvent<HTMLInputElement>): void => {
  //     const newValue = e.target.value;
  //     setValue(newValue);
  //   };

  const getInputProps = (type: string, id: string, placeholder: string, autocomplete: string) => {
    return {
      type: type,
      id: id,
      placeholder: placeholder,
      autoComplete: autocomplete,
    };
  };

  const inputEmailProps = getInputProps('email', 'email', 'Type email address here', 'email');

  const inputPasswordProps = getInputProps('password', 'password', 'Create a strong password', 'off');

  const onSubmit = (data: LoginFormValues) => {
    console.log('form submitted', data);
    setValueEmail(data.email.toLowerCase());
    setValuePassword(data.password);
  };

  const emailValidation = {
    required: {
      value: true,
      message: 'Email field is required',
    },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Invalid email format: no whitespaces, should contain domain and @ sign.',
    },
  };

  const passwordValidation = {
    required: {
      value: true,
      message: 'Password field is required',
    },
    minLength: {
      value: 8,
      message: 'Password should contain minimum 8 characters.',
    },
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      message: 'Password should contain a number, uppercase and lowercase letters, and may contain special characters.',
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style['login-form']} data-testid="login-form" noValidate>
      <FormTitle title="Login" />
      <section className={style['input-section']}>
        <Input
          inputProps={{
            ...register('email', emailValidation),
            ...inputEmailProps,
          }}
          label="E-mail "
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
      </section>
      <section className={style['input-section']}>
        <Input
          inputProps={{
            ...register('password', passwordValidation),
            ...inputPasswordProps,
          }}
          label="Password "
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </section>
      <button>Login Your Account</button>
      <section>
        <p>Don’t have an account?</p>
        <p>Sign Up</p>
      </section>
    </form>
  );
}
