import style from './_clearButton.module.scss';
import chevronIcon from '../../assets/images/icons/chevron-icon.svg';

// это заглушка
const handleClick = (): Promise<void> =>
  new Promise((resolve) => {
    resolve();
  });

export default function ClearButton(callback: () => Promise<void> = handleClick): JSX.Element {
  return (
    <div className={style.wrapper}>
      <button onClick={callback} type="button" className={style['clear-button']}>
        Clear all
      </button>
      <img src={chevronIcon} alt="" className={style.icon} />
    </div>
  );
}
