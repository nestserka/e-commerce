import style from './_main.module.scss';
import LoginForm from '../../components/loginForm/loginForm.tsx';

export default function MainPage(): JSX.Element {
  return (
    <main className={style.main} data-testid="main">
      MainPage
      <LoginForm />
    </main>
  );
}
