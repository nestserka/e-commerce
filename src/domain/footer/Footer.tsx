import style from './_footer.module.scss';
import logo from '../../assets/images/rs-logo.svg';

export default function Footer(): JSX.Element {
  return (
    <footer className={style.footer} data-testid="footer">
      <a
        className={style['footer-section']}
        href="https://rs.school/courses/javascript-mentoring-program"
        target="_blank"
        rel="noreferrer"
      >
        <img src={logo} className="rs-logo" alt="RS School logotype" />
      </a>
      <span className={style['footer-section']}>Final task</span>
      <span className={style['footer-section']}>2024</span>
    </footer>
  );
}
