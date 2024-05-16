import RegistrationForm from '../../domain/customer/registrationForm/registrationForm';
import style from './_registration.module.scss';

export default function RegistrationPage(): JSX.Element {
  return (
    <section className={style['registration-content-wrapper']} data-testid="registration">
      <RegistrationForm />
    </section>
  );
}
