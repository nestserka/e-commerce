import { useState } from 'react';

import style from './_promocode.module.scss';
import { useLoginData } from '../../../core/state/userState';
import { useCartData } from '../../../core/state/cartState';

import type { ChangeEvent, FormEvent } from 'react';

export default function Promocode(): JSX.Element {
  const [promocodeValue, setPromocodeValue] = useState<string>('');
  const { customerId } = useLoginData();
  const { isPromocodeApplied, addDiscountCode } = useCartData();

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      await addDiscountCode(customerId, promocodeValue);
    } catch (err) {
      console.log('Failed to apply promocode to the cart', err);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    setPromocodeValue(value);
  };

  return (
    <div className={style.wrapper}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="PROMOCODE" value={promocodeValue} onChange={handleInputChange} className="" />
        <button type="submit" className="button-primary" disabled={isPromocodeApplied}>
          {isPromocodeApplied ? 'Already applied' : 'Apply'}
        </button>
      </form>
    </div>
  );
}
