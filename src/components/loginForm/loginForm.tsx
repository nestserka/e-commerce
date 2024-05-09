import style from './_loginform.module.scss';

export default function LoginForm(): JSX.Element {
  return (
    <form className={style['login-form']} data-testid="login">
      <h1>Login</h1>
    </form>
  );
}
