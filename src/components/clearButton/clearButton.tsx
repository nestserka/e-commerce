import style from './_clearButton.module.scss';
import removeIcon from '../../assets/images/icons/icon-delete.svg';

// это заглушка
const handleClick = (): Promise<void> =>
  new Promise((resolve) => {
    resolve();
  });

export default function ClearButton(): JSX.Element {
  return (
    <button onClick={handleClick} type="button" className={`${style['clear-button']} button-secondary`}>
      <span>Clear all</span>
      <img src={removeIcon} alt="" className={style.icon} />
    </button>
  );
}
