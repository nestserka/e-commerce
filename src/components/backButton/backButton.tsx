import { useNavigate } from 'react-router-dom';

import style from './_backButton.module.scss';
import chevronIcon from '../../assets/images/icons/chevron-icon.svg';

export default function BackButton(): JSX.Element {
  const navigate = useNavigate();

  const handleGoBack = (): void => {
    navigate(-1);
  };

  return (
    <div className={style.wrapper}>
      <img src={chevronIcon} alt="" className={style.icon} />
      <button onClick={handleGoBack} type="button" className={style['back-button']}>
        Go Back
      </button>
    </div>
  );
}
