import style from './_loginform.module.scss';
import Input from '../ui/input/input';

export default function LoginForm(): JSX.Element {
  return (
    <form className={style['login-form']} data-testid="login">
      <h1>Login</h1>
      <Input type="email" id="email" name="email" placeholder="Type email here" value="" label="Email: *" />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Create a strong password"
        value=""
        label="Password: *"
      />
      <button>Login Your Account</button>
      <section>
        <p>Don’t have an account?</p>
        <a href="#">Sign Up</a>
      </section>
    </form>
  );
}
