import style from './_footer.module.scss';
import logo from '../../assets/images/rs-logo.svg';

export default function Footer(): JSX.Element {
  return (
    <footer className={style.footer} data-testid="footer">
      <section>
        <a href="https://rs.school/courses/javascript-mentoring-program" target="_blank">
          <img src={logo} className="rs-logo" alt="RS School logotype" />
        </a>
      </section>
      <section>
        <span>Final task</span>
      </section>
      <section>
        <span>2024</span>
      </section>
    </footer>
  );
}
