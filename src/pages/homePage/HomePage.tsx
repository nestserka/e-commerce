import style from './_home.module.scss';
import { showModalMessage, useCustomerInfo, useLoginData } from '../../core/state/userState';
import ModalMessage from '../../components/modalMessage/ModalMessage';
import icon from '../../../public/assets/icons/rocket-icon.svg';
import HomeCategory from '../../components/homeCategory/HomeCategory';

const modalMessageSuccessRegistrationProps = {
  type: 'success',
  title: 'Successful Registration',
  message: 'You registered and entered your account successfully.',
};

export default function HomePage(): JSX.Element {
  const { isShown } = showModalMessage();
  const { type, title, message } = modalMessageSuccessRegistrationProps;
  const { isAuth } = useLoginData();
  const { firstName } = useCustomerInfo();

  return (
    <section className={style.home} data-testid="home">
      {isShown && <ModalMessage type={type} title={title} message={message} />}
      <section className={style['welcome-section']}>
        <h1 className={style.title}>
          <span className={style['accent-text']}>Embark </span>on a journey
          <br />
          of your creative discovery
        </h1>
        <div className={style['greeting-wrapper']}>
          <div className={style['rocket-icon']}>
            <img src={icon} alt="" />
          </div>
          <div>
            <h1 className={style.subtitle}>
              {isAuth ? (
                <>
                  <span className={style['accent-text']}>
                    {firstName ? `Hello, Dear ${firstName}!` : 'Hello, Dear customer!'}
                  </span>
                  <br />
                  We&apos;re happy to see you again
                </>
              ) : (
                <>
                  <span className={style['accent-text']}>Hello, Stranger!</span>
                  <br />
                  Feel free to explore our digital hub.
                </>
              )}
            </h1>
          </div>
        </div>
      </section>
      <HomeCategory />
    </section>
  );
}
