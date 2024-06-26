import { useRef } from 'react';

import style from './_promotion.module.scss';
import binocular from '../../../assets/images/card/binocular.png';
import spaceFood from '../../../assets/images/card/promo-orion.png';
import iconAllien from '../../../assets/images/icons/icon-allien.svg';
import { showModalMessage } from '../../../core/state/userState';
import ModalMessage from '../../modalMessage/ModalMessage';
import { currentCoupons } from '../../../constants/constants';

const modalMessageSuccessUpdateProps = {
  type: 'success',
  title: 'Promo code copied',
  message: 'You can use this promo in your card!',
};

export default function HomePromotion(): JSX.Element {
  const { type, title, message } = modalMessageSuccessUpdateProps;

  const { isClipBoardShown, setIsClipShown } = showModalMessage();
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleCopy = (index: number): void => {
    const currentCoupon = spanRefs.current[index]?.textContent;

    if (currentCoupon) {
      navigator.clipboard
        .writeText(currentCoupon)
        .then(() => {
          setIsClipShown(true);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    }
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
        <div className={`${style['product-container']} ${style['half-layout-promo']}`}>
          <div className={style['information-block']}>
            <span className={style['discount-name']}>PROMOCODE</span>
            <h2 className={`${style.title} ${style['sub-text']}`}>
              Use our promo code VENUS_DEALS on purchases over $3000 and get 20% off!
            </h2>
          </div>
          <div className={style.poster}>
            <button
              type="button"
              className={style['promocode-clipper']}
              onClick={() => {
                handleCopy(0);
              }}
              title="Click on the button to copy the promocode"
            >
              <img src={iconAllien} alt="Button icon" />
              <span
                ref={(el) => {
                  spanRefs.current[0] = el;
                }}
              >
                {currentCoupons[1]}
              </span>
            </button>
          </div>
        </div>

        <div className={`${style['product-container']} ${style['half-layout-promo']} ${style.sub}`}>
          <div className={style['information-block']}>
            <span className={style['discount-name']}>PROMOCODE</span>
            <h2 className={`${style.title} ${style['sub-text']}`}>
              Feel the cosmic sweetness! Buy 3 strawberry desserts for the price of 2!
            </h2>
          </div>
          <div className={style.poster}>
            <div>
              <button
                type="button"
                className={style['promocode-clipper']}
                onClick={() => {
                  handleCopy(1);
                }}
                title="Click on the button to copy the promocode"
              >
                <img src={iconAllien} alt="Button icon" />
                <span
                  ref={(el) => {
                    spanRefs.current[1] = el;
                  }}
                >
                  {currentCoupons[2]}
                </span>
              </button>
            </div>
            <img src={spaceFood} alt="SpaceFood" className={`${style.display} ${style['food-picture']}`} />
          </div>
        </div>
      </div>

      <div className={`${style['promotion-wrapper']} ${style.promocode}`}>
        <div className={style['information-block']}>
          <span className={style['discount-name']}>PROMOCODE</span>
          <h2 className={`${style.title} ${style['promocode-text']}`}>
            Houston, we have a discount! Use our promo code LUCKY_MARTIAN for Stellar Savings!
          </h2>
        </div>
        <div className={style.coupang}>
          <div className={style['ufo-wrapper']} />
          <button
            type="button"
            className={style['promocode-clipper']}
            onClick={() => {
              handleCopy(2);
            }}
            title="Click on the button to copy the promocode"
          >
            <img src={iconAllien} alt="Button icon" />
            <span
              ref={(el) => {
                spanRefs.current[2] = el;
              }}
            >
              {currentCoupons[0]}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
