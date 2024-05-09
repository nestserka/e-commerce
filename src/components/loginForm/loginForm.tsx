import style from './_loginform.module.scss';
import Input from '../ui/input/input';
import { useLoginData } from '../../core/state/loginState';

export default function LoginForm(): JSX.Element {
  const { setValueEmail, setValuePassword, valueEmail, valuePassword } = useLoginData();

  const handleInputEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(valueEmail);
    const newValue = e.target.value;
    setValueEmail(newValue);
    console.log(valueEmail);
  };

  const handleInputPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(valuePassword);
    const newValue = e.target.value;
    setValuePassword(newValue);
    console.log(valuePassword);
  };

  return (
    <form className={style['login-form']} data-testid="login">
      <h1>Login</h1>
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="Type email here"
        label="Email: *"
        onChange={handleInputEmailChange}
      />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Create a strong password"
        label="Password: *"
        onChange={handleInputPasswordChange}
      />
      <button type="submit">Login Your Account</button>
      <section>
        <p>Don’t have an account?</p>
        <p>Sign Up</p>
      </section>
    </form>
  );
}
