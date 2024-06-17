import style from './_promotion.module.scss';
import binocular from '../../../assets/images/card/binocular.png';
import spaceFood from '../../../assets/images/card/food.png';
import poster from '../../../assets/images/card/poster.png';
import iconAllien from '../../../assets/images/icons/icon-allien.svg';
import { showModalMessage } from '../../../core/state/userState';
import ModalMessage from '../../modalMessage/ModalMessage';
import { currentCoupon } from '../../../constants/constants';

const modalMessageSuccessUpdateProps = {
  type: 'success',
  title: 'Promo code copied',
  message: 'You can use this promo in your card!',
};

export default function HomePromotion(): JSX.Element {
  const { type, title, message } = modalMessageSuccessUpdateProps;

  const { isClipBoardShown, setIsClipShown } = showModalMessage();

  const handleCopy = (): void => {
    navigator.clipboard
      .writeText(currentCoupon)
      .then(() => {
        setIsClipShown(true);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <section className={style['promotion-section']}>
      {isClipBoardShown && <ModalMessage type={type} title={title} message={message} />}
      <div className={`${style['promotion-wrapper']} ${style.eyewear}`}>
        <div className={style['information-block']}>
          <span className={style['discount-name']}>10% OFF</span>
          <h2 className={style.title}>The super eye for the night sky!</h2>
          <p className={style.description}>
            Discover the night sky through Omegon 2.1x42mm Star Field Binoculars and Telescopes with 10% off.
          </p>
        </div>
        <img src={binocular} alt="EyewearImage" className={style.product} />
      </div>
      <div className={`${style['promotion-wrapper']} ${style['double-layer']}`}>
        <div className={style['product-container']}>
          <div className={style['information-block']}>
            <span className={style['discount-name']}>15% OFF</span>
            <h2 className={`${style.title} ${style['sub-text']}`}>
              15% discount on stunning space image canvas prints!
            </h2>
          </div>
          <div className={style.poster}>
            <img src={poster} alt="poster" className={`${style.display} ${style['art-picture']}`} />
          </div>
        </div>
        <div className={`${style['product-container']} ${style.sub}`}>
          <div className={style['information-block']}>
            <span className={style['discount-name']}>20% OFF</span>
            <h2 className={`${style.title} ${style['sub-text']}`}>Unlock 20% off astronaut space food only today!</h2>
          </div>
          <div className={style.poster}>
            <img src={spaceFood} alt="SpaceFood" className={`${style.display} ${style['food-picture']}`} />
          </div>
        </div>
      </div>
      <div className={`${style['promotion-wrapper']} ${style.promocode}`}>
        <div className={style['information-block']}>
          <span className={style['discount-name']}>PROMOCODE</span>
          <h2 className={`${style.title} ${style['promocode-text']}`}>
            Houston, We Have a Discount!Use our promo code LUCKY_MARTIAN for Stellar Savings!
          </h2>
        </div>
        <div className={style.coupang}>
          <div className={style['ufo-wrapper']} />
          <button type="button" className={style['promocode-clipper']} onClick={handleCopy}>
            <img src={iconAllien} alt="Button icon" />
            <span>{currentCoupon}</span>
          </button>
          <p className={style['sub-text']}>Copy the promo by clicking on the UFO icon on the left.</p>
        </div>
      </div>
    </section>
  );
}
