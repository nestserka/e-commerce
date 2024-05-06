import style from './_footer.module.scss';

export default function ProfilePage(): JSX.Element {
  return (
    <footer className={style.footer} data-testid="footer">
      Footer
    </footer>
  );
}
