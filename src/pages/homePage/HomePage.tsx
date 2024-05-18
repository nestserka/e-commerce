import style from './_home.module.scss';
import { ROUTES } from '../../constants/constants';
import HomeNavItem from '../../components/homeNavItem/HomeNavItem';
import regIcon from '../../assets/images/icons/register-nav-icon.svg';
import loginIcon from '../../assets/images/icons/login-nav-icon.svg';
import aboutIcon from '../../assets/images/icons/team-nav-icon.svg';
import catalogIcon from '../../assets/images/icons/catalog-nav-icon.svg';

const navItemsContent = [
  {
    title: 'Create a new account on our cosmic e-commerce hub to start shopping today.',
    icon: `${regIcon}`,
    route: `${ROUTES.SING_UP}`,
    linkLabel: 'Sign Up',
  },
  {
    title: 'Log in to your existing account on the e-commerce site to continue shopping.',
    icon: `${loginIcon}`,
    route: `${ROUTES.SING_IN}`,
    linkLabel: 'Sign In',
  },
  {
    title: 'Explore project details and meet the team behind it on our website.',
    icon: `${aboutIcon}`,
    route: `${ROUTES.ABOUT}`,
    linkLabel: 'About Us',
  },
  {
    title: 'Browse our catalog to discover our latest products and offerings.',
    icon: `${catalogIcon}`,
    route: `${ROUTES.CATALOG}`,
    linkLabel: 'Catalog',
  },
];

export default function HomePage(): JSX.Element {
  return (
    <section className={style.home} data-testid="home">
      <h1 className={style.title}>
        <span className={style['accent-text']}>Hello, stranger!</span>
        <br />
        Feel free to explore our digital hub.
      </h1>
      <section className={style['nav-wrapper']}>
        {navItemsContent.map((content, index) => (
          <HomeNavItem
            key={content.linkLabel}
            index={index}
            title={content.title}
            route={content.route}
            icon={content.icon}
            linkLabel={content.linkLabel}
          />
        ))}
      </section>

      {/* <div className={style['links-wrapper']}>
        <div className={style.left}>
          <span>/01</span>
          <h2 className={style.title}>Create an Account</h2>
          <div className={style.circle} />
          <NavLink to={ROUTES.SING_UP} className={style['button-secondary']}>
            Sign Up
          </NavLink>
        </div>
        <div className={style.center}>
          <span>/02</span>
          <h2 className={style.title}>Enter Your Profile</h2>
          <div className={style.circle} />
          <NavLink to={ROUTES.SING_IN} className={style['button-secondary']}>
            Sign In
          </NavLink>
        </div>
        <div className={style.right}>
          <span>/03</span>
          <h2 className={style.title}>Who We Are</h2>
          <div className={style.circle} />
          <NavLink to={ROUTES.ABOUT} className={style['button-secondary']}>
            About Us
          </NavLink>
        </div>
      </div> */}
    </section>
  );
}
