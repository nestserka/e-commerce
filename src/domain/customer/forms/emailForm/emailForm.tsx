import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

import style from '../_forms.module.scss';
import { EMAIL_VALIDATION_SCHEMA } from '../../../../constants/constants';
import FormTitle from '../../../../components/formTitle/FormTitle';
import { inputEmailProps } from '../../../../utils/inputProps';
import Input from '../../../../components/ui/input/input';
import ErrorMessage from '../../../../components/errorMessage/ErrorMessage';
import ModalProfile from '../../../../components/modalProfile/ModalProfile';
import { api } from '../../../../api/Api';
import { useCustomerInfo } from '../../../../core/state/userState';

import type { FormModal } from '../../../../utils/types';
import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';


const schema = z.object({
  email: EMAIL_VALIDATION_SCHEMA,
});

export type EmailFormValues = z.infer<typeof schema>;

export default function EmailForm({ isOpen, onClose }: FormModal): JSX.Element {
  const { version, setUpdatedEmail } = useCustomerInfo();
  const { register, handleSubmit, formState, reset } = useForm<EmailFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { errors, isDirty, isValid, isSubmitting } = formState;
  const [formEmailError, setFormEmailError] = useState<string>('');

  const onSubmit = (data: EmailFormValues): void => {
    const body: MyCustomerUpdateAction[] = [
      {
        action: 'changeEmail',
        email: data.email,
      },
    ];
    api
      .updateCustomer(version, body)
      .then((response) => {
        const customerInfo = {
          valueEmail: response.body.email,
          version: response.body.version,
        };
        setUpdatedEmail(customerInfo);
        onClose();
        reset();
      })
      .catch((error : Error) => {
        setFormEmailError(error.message);
      });
  };

  return (
    <ModalProfile isOpen={isOpen} onClose={onClose}>
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
          {formEmailError && <ErrorMessage message={formEmailError} />}
        </section>
        <button type="submit" className="button-primary" disabled={!isDirty || !isValid || isSubmitting}>
          Change Email
        </button>
      </form>
    </ModalProfile>
  );
}
