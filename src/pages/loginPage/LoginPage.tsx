import LoginForm from '../../domain/customer/loginForm/loginForm';
import style from './_login.module.scss';

export default function LoginPage(): JSX.Element {
  return (
    <main className={style['login-content-wrapper']} data-testid="login">
      <LoginForm />
    </main>
  );
}
