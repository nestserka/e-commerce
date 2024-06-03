import { useNavigate } from 'react-router';

import ModalProfile from '../modalProfile/ModalProfile';
import style from '../../domain/customer/forms/_forms.module.scss';
import { ROUTES } from '../../constants/constants';
import { logOut } from '../../utils/logOut';

export default function ErrorWindow({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }): JSX.Element {
  const navigate = useNavigate();
  const redirectToLogin = (): void => {
    onClose();
    logOut();
    navigate(ROUTES.SING_IN);
  };

  return (
    <ModalProfile isOpen={isOpen} onClose={onClose}>
      <div className={style['error-form']} data-testid="error-form">
        <p className={style['confirm-text']}>Looks like your session has expired. Try to login again!</p>
        <button type="button" className="button-primary" onClick={redirectToLogin}>
          Login
        </button>
      </div>
    </ModalProfile>
  );
}
