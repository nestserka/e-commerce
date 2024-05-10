import style from './_loginform.module.scss';
import inputStyles from '../ui/input/_input.module.scss';
import FormTitle from '../formTitle/FormTitle';
import { useLoginData } from '../../core/state/loginState';
import { useForm } from 'react-hook-form';
import LoginFormValues from './types';

export default function LoginForm(): JSX.Element {
  const { setValueEmail, setValuePassword } = useLoginData();
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const handleInputChange =
    (setValue: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      setValue(newValue);
    };

  const getInputProps = (
    type: string,
    id: string,
    placeholder: string,
    label: string,
    autocomplete: string,
    setValue: (value: string) => void,
  ) => {
    return {
      type: type,
      id: id,
      placeholder: placeholder,
      label: label,
      autocomplete: autocomplete,
      onChange: handleInputChange(setValue),
    };
  };

  const inputEmailProps = getInputProps('email', 'email', 'Type email address here', 'Email ', 'email', setValueEmail);

  const inputPasswordProps = getInputProps(
    'password',
    'password',
    'Create a strong password',
    'Password ',
    'off',
    setValuePassword,
  );

  const onSubmit = (data: LoginFormValues) => {
    console.log('form submitted', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style['login-form']} data-testid="login" noValidate>
      <FormTitle title="Login" />
      <input
        className={inputStyles.input}
        {...inputEmailProps}
        {...register('email', {
          required: {
            value: true,
            message: 'Email is required',
          },
          pattern: {
            value: /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/,
            message: 'Invalid email format',
          },
        })}
      />
      <input
        className={inputStyles.input}
        {...inputPasswordProps}
        {...register('password', { required: 'Password field is required' })}
      />

      <button>Login Your Account</button>
      <section>
        <p>Don’t have an account?</p>
        <p>Sign Up</p>
      </section>
    </form>
  );
}
