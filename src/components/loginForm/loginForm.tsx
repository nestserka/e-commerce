import style from './_loginform.module.scss';
import Input from '../ui/input/input';
import FormTitle from '../formTitle/FormTitle';
import { useLoginData } from '../../core/state/loginState';

export default function LoginForm(): JSX.Element {
  const { setValueEmail, setValuePassword } = useLoginData();

  const handleInputChange =
    (setValue: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      setValue(newValue);
    };

  const getInputProps = (
    type: string,
    id: string,
    name: string,
    placeholder: string,
    label: string,
    autocomplete: string,
    setValue: (value: string) => void,
  ) => {
    return {
      type: type,
      id: id,
      name: name,
      placeholder: placeholder,
      label: label,
      autocomplete: autocomplete,
      onChange: handleInputChange(setValue),
    };
  };

  const inputEmailProps = getInputProps(
    'email',
    'email',
    'email',
    'Type email address here',
    'Email ',
    'email',
    setValueEmail,
  );

  const inputPasswordProps = getInputProps(
    'password',
    'password',
    'password',
    'Create a strong password',
    'Password ',
    'off',
    setValuePassword,
  );

  return (
    <form className={style['login-form']} data-testid="login">
      <FormTitle title="Login" />
      <Input {...inputEmailProps} />
      <Input {...inputPasswordProps} />

      <button type="submit">Login Your Account</button>
      <section>
        <p>Don’t have an account?</p>
        <p>Sign Up</p>
      </section>
    </form>
  );
}
