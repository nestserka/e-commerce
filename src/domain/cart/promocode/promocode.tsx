import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import style from './_promocode.module.scss';
import { useLoginData } from '../../../core/state/userState';
import { useCartData } from '../../../core/state/cartState';
import ErrorMessage from '../../../components/errorMessage/ErrorMessage';
import { PROMOCODE_VALIDATION_SCHEMA } from '../../../constants/constants';

const schema = z.object({
  promocode: PROMOCODE_VALIDATION_SCHEMA,
});

type PromocodeFormValue = z.infer<typeof schema>;

export default function Promocode(): JSX.Element {
  const { customerId } = useLoginData();
  const { isPromocodeApplied, addDiscountCode, error } = useCartData();

  const { register, handleSubmit, formState, reset } = useForm<PromocodeFormValue>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { errors } = formState;

  const onSubmit = async (data: PromocodeFormValue): Promise<void> => {
    if (data.promocode) {
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
        <input
          type="text"
          placeholder="PROMOCODE"
          {...register('promocode')}
          disabled={isPromocodeApplied}
          className=""
        />
        {errors.promocode && <ErrorMessage message={errors.promocode.message} />}
        <button type="submit" className="button-primary" disabled={isPromocodeApplied}>
          {isPromocodeApplied ? 'Already applied' : 'Apply'}
        </button>
      </form>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
