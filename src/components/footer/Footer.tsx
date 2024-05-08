import style from './_footer.module.scss';
import logo from '../../assets/images/rs-logo.svg';

export default function Footer(): JSX.Element {
  return (
    <footer className={style.footer} data-testid="footer">
      <section className={style['footer-section']}>
        <a href="https://rs.school/courses/javascript-mentoring-program" target="_blank" rel="noreferrer">
          <img src={logo} className="rs-logo" alt="RS School logotype" />
        </a>
      </section>
      <section className={style['footer-section']}>
        <span>Final task</span>
      </section>
      <section className={style['footer-section']}>
        <span>2024</span>
      </section>
    </footer>
  );
}
