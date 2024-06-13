import style from './_promotion.module.scss';
import binocular from '../../../assets/images/card/binocular.png';
import spaceFood from '../../../assets/images/card/food.png';
import iconAllien from '../../../assets/images/icons/-icon-allien.svg';

export default function HomePromotion(): JSX.Element {
  const textToCopy = 'LUCKY_MARTIAN';

  const handleCopy = (): void => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log('worked');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <section className={style['promotion-section']}>
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
        <div className={style['art-container']}>
          <div className={style['information-block']}>
            <span className={style['discount-name']}>15% OFF</span>
            <h2 className={style.title}>15% discount on stunning space image canvas prints!</h2>
          </div>
        </div>
        <div className={style['food-container']}>
          <div className={style['information-block']}>
            <span className={style['discount-name']}>20% OFF</span>
            <h2 className={style.title}>Unlock 20% off astronaut space food only today!</h2>
          </div>
          <img src={spaceFood} alt="SpaceFood" className={style.food} />
        </div>
      </div>
      <div className={`${style['promotion-wrapper']} ${style.promocode}`}>
        <div className={style['information-block']}>
          <span className={style['discount-name']}>PROMOCODE</span>
          <h2 className={style.title}>
            Houston, We Have a Discount!Use our promo code LUCKY_MARTIAN for Stellar Savings!
          </h2>
        </div>
        <div className={style.coupang}>
          <div className={style['ufo-wrapper']} />
          <button type="button" className={style['promocode-clipper']} onClick={handleCopy}>
            <img src={iconAllien} alt="Button icon" />
            <span>LUCKY MARTIAN</span>
          </button>
          <p className={style['sub-text']}>Copy the promo by clicking on UFO icon on the left</p>
        </div>
      </div>
    </section>
  );
}
