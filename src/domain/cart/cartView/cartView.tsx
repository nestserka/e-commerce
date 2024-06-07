import style from './_cartView.module.scss';
import FormSubTitle from '../../../components/formSubTitle/formSubTitle';

export default function CartView(): JSX.Element {
  return (
    <div className={style.wrapper}>
      <section className={style['products-list-wrapper']} data-testid="products-list-wrapper">
        <FormSubTitle subTitle="Products" />
      </section>
      <aside className={style['aside-wrapper']}>
        <section className={style['summary-wrapper']}>
          <FormSubTitle subTitle="Summary" />
        </section>
        <section className={style['promocode-wrapper']}>
          <FormSubTitle subTitle="Promocode" />
        </section>
      </aside>
    </div>
  );
}
