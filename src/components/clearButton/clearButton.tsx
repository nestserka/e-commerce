import style from './_clearButton.module.scss';
import removeIcon from '../../assets/images/icons/icon-delete.svg';

import type { ClearButtonProps } from './types';

export default function ClearButton({ onClick }: ClearButtonProps): JSX.Element {
  return (
    <button onClick={onClick} type="button" className={`${style['clear-button']} button-secondary`}>
      <span>Clear all</span>
      <img src={removeIcon} alt="" className={style.icon} />
    </button>
  );
}
