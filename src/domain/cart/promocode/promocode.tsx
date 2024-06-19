import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import style from './_promocode.module.scss';
import { useLoginData } from '../../../core/state/userState';
import ErrorMessage from '../../../components/errorMessage/ErrorMessage';
import { PROMOCODE_VALIDATION_SCHEMA } from '../../../constants/constants';
import { useBoundStore } from '../../../core/state/boundState';
import FormSubTitle from '../../../components/formSubTitle/formSubTitle';

const schema = z.object({
  promocode: PROMOCODE_VALIDATION_SCHEMA,
});

type PromocodeFormValue = z.infer<typeof schema>;

export default function Promocode(): JSX.Element {
  const { customerId } = useLoginData();
  const { addDiscountCode, error, checkIfAlreadyExist, appliedCoupons} = useBoundStore();

  const { register, handleSubmit, formState, reset } = useForm<PromocodeFormValue>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { errors } = formState;

  // const removeCurrentPromoveCode() => {
  //   const body: MyCartRemoveDiscountCodeAction[] = [
  //     {
  //       action: 'removeDiscountCode',
  //       discountCode: {
  //         typeId: activeCart?.discountCodes
  //         id: appliedPromoCode.discountCode.id,
  //       },
  //     },
  //   ];
  // }

  const onSubmit = async (data: PromocodeFormValue): Promise<void> => {
    const hasCouponAdded = checkIfAlreadyExist(data.promocode);
    console.log(hasCouponAdded);

    if (data.promocode && !hasCouponAdded) {
      await addDiscountCode(customerId, data.promocode)
        .then(() => {
          reset();
        })
        .catch((err) => {
          console.log('Failed to apply promocode to the cart', err);
        });
    }
  };

  return (
    <div className={style.wrapper}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="PROMOCODE" {...register('promocode')} className="" />
        {errors.promocode && <ErrorMessage message={errors.promocode.message} />}
        <button type="submit" className="button-primary">
          Apply
        </button>
      </form>
      {error && <ErrorMessage message={error} />}
      <FormSubTitle subTitle="Used Promocodes" />
      {appliedCoupons && appliedCoupons.length > 0 && (
        <div className={style['applied-promocodes']}>
          {appliedCoupons.map((promocode) => (
           <div key={promocode.id} className={style['applied-promo']}>
           {promocode.name}
           <button type='button' className='button-primary'>Remove</button>
         </div>
          ))}
        </div>
      )}
    </div>
  );
}
