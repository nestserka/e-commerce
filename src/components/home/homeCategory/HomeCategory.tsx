import { DYNAMIC_ROUTES } from '../../../constants/constants';
import style from './_homeCategory.module.scss';
import meteoryte1 from '../../../../public/assets/images/home/meteorite-1.png';
import meteoryte2 from '../../../../public/assets/images/home/meteorite-2.png';
import meteoryte3 from '../../../../public/assets/images/home/meteorite-3.png';

export default function HomeCategory(): JSX.Element {
  return (
    <section className={style['category-section']}>
      <section className={`${style['category-container']} ${style.meteorites}`}>
        <div className={style['text-wrapper']}>
          <h2 className={style.title}>Rare meteorites</h2>
          <p className={style['product-description']}>
            Create a new account on our cosmic e-commerce hub to start shopping today!
          </p>
          <a className={style['category-button']} href={`${DYNAMIC_ROUTES.CATALOG}meteorite`}>
            Explore Now
          </a>
        </div>
        <div className={style['meteorite-images']}>
          <img src={meteoryte1} alt="Meteoryte 1" className={style['meteorite-image-1']} />

          <img src={meteoryte2} alt="Meteoryte 2" className={style['meteorite-image-2']} />

          <img src={meteoryte3} alt="Meteoryte 3" className={style['meteorite-image-3']} />
        </div>
      </section>
      <section className={`${style['category-container']} ${style.astronaut}`}>
        <div className={style['text-wrapper']}>
          <h2 className={style.title}>Space Suits</h2>
          <p className={style['product-description']}>
            Discover a stunning collection of unique spacesuits, featuring meticulously crafted replicas from iconic
            astronauts.
          </p>
          <a
            className={`${style['category-button']} ${style.astronout} `}
            href={`${DYNAMIC_ROUTES.CATALOG}space-suits`}
          >
            Explore Now
          </a>
        </div>
      </section>
      <section className={`${style['category-container']} ${style.food}`}>
        <div className={style['text-wrapper']}>
          <h2 className={style.title}>Space Food</h2>
          <p className={style['product-description']}>
            Uncover delicious space food and treats available for purchase here!
          </p>
          <a className={style['category-button']} href={`${DYNAMIC_ROUTES.CATALOG}space-food`}>
            Explore Now
          </a>
        </div>
        <div className={style['food-images']}>
          <img alt="Small Meteoryte 1" className={style['small-meteorite-image-1']} />

          <img alt="Product Preview" className={style['space-food-image-1']} />
        </div>
        <div className={style['gradient-wrapper']}>
          <img alt="Small Meteoryte 2" className={style['small-meteorite-image-2']} />
          <div className={style['image-wrapper']}>
            <img alt="Product Preview 2" className={style['space-food-image-2']} />
          </div>
        </div>
      </section>
    </section>
  );
}
