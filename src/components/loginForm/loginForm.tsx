import style from './_loginform.module.scss';
import Input from '../ui/input/input';
import FormTitle from '../formTitle/FormTitle';
import { useLoginData } from '../../core/state/loginState';

import type { ReactNode } from 'react';

export default function LoginForm(): JSX.Element {
  const { setValueEmail, setValuePassword } = useLoginData();

  const handleInputChange =
    (setValue: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      setValue(newValue);
    };

  const inputProps = [
    {
      type: 'email',
      id: 'email',
      name: 'email',
      placeholder: 'Type email address here',
      label: 'Email: *',
      autocomplete: 'email',
      onChange: setValueEmail,
    },

    {
      type: 'password',
      id: 'password',
      name: 'password',
      placeholder: 'Create a strong password',
      label: 'Password: *',
      autocomplete: 'off',
      onChange: setValuePassword,
    },
  ];

  return (
    <form className={style['login-form']} data-testid="login">
      <FormTitle title="Login" />
      {inputProps.map(
        ({ type, id, name, placeholder, label, autocomplete, onChange }): ReactNode => (
          <Input
            key={name}
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            label={label}
            autocomplete={autocomplete}
            onChange={handleInputChange(onChange)}
          />
        ),
      )}
      <button type="submit">Login Your Account</button>
      <section>
        <p>Don’t have an account?</p>
        <p>Sign Up</p>
      </section>
    </form>
  );
}
