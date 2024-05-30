
import style from './card.module.scss';

function Card(): JSX.Element {
  // const [currentImage, setCurrentImage] = useState<string>('');
  // const [currentSecondImage, setCurrentSecondImage] = useState<string>('');
  // const [description, setDescription] = useState<string>('');

  return (
    <div className={style.card_wrapper}>
      {/* <img className={style.card_pic} src={currentSecondImage || currentImage} alt="" />
      <h2 className={style.card_name} id={props.keyCard}>
        <span>{props.sku}</span>
      </h2>
      <div className={style.card_description}>{description}</div>
      <div className={style.card_buy}>
        <span className={!props.discounted ? style.card_price : style.linethrough}>{props.prices}$</span>
        <span className={style.card_discount}>{props.discounted}</span>
      </div> */}
    </div>
  );
}

export default Card;
