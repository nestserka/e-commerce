import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import style from '../_forms.module.scss';
import { EMAIL_VALIDATION_SCHEMA } from '../../../../constants/constants';
import FormTitle from '../../../../components/formTitle/FormTitle';
import { inputEmailProps } from '../../../../utils/inputProps';
import Input from '../../../../components/ui/input/input';
import ErrorMessage from '../../../../components/errorMessage/ErrorMessage';
import ModalProfile from '../../../../components/modalProfile/ModalProfile';

import type { FormModal } from '../../../../utils/types';
// import { useState } from 'react';

const schema = z.object({
  email: EMAIL_VALIDATION_SCHEMA,
});

export type EmailFormValues = z.infer<typeof schema>;

export default function EmailForm({isOpen, onClose}: FormModal): JSX.Element {
  const { register, handleSubmit, formState, reset } = useForm<EmailFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { errors } = formState;
  //   const [formEmailError, setFormEmailError] = useState<string>('');

  const onSubmit = (data: EmailFormValues): void => {
    console.log(data);
    reset();
  };

  return (
    <ModalProfile
    isOpen={isOpen}
    onClose={onClose}>
    <form onSubmit={handleSubmit(onSubmit)} className={style['email-form']} data-testid="email-form" noValidate>
      <FormTitle title="Change Email" />
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('email'),
              ...inputEmailProps,
            }}
            label="E-mail "
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
          {/* {formEmailError && <ErrorMessage message={formEmailError} />} */}
        </section>
        <button type="submit" className="button-primary">
        Login Your Account
      </button>
    </form>
    </ModalProfile>
  );
}
