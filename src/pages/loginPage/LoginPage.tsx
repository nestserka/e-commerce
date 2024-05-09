import LoginForm from '../../components/loginForm/loginForm';
import style from './_login.module.scss';

export default function LoginPage(): JSX.Element {
  return (
    <section className={style.login} data-testid="login">
      <LoginForm />
    </section>
  );
}
