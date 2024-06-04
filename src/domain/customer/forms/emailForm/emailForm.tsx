import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';

import style from '../_forms.module.scss';
import { EMAIL_VALIDATION_SCHEMA, ERROR_TYPES } from '../../../../constants/constants';
import FormTitle from '../../../../components/formTitle/FormTitle';
import { inputEmailProps } from '../../../../utils/inputProps';
import Input from '../../../../components/ui/input/input';
import ErrorMessage from '../../../../components/errorMessage/ErrorMessage';
import ModalProfile from '../../../../components/modalProfile/ModalProfile';
import { showErrorMessage, showModalMessage, useCustomerInfo } from '../../../../core/state/userState';
import { type FormModal, VERSION_ERROR_MESSAGE } from '../../../../utils/types';
import updateCustomer from '../../../../api/me/updateCustomer';

import type { ZodType, ZodTypeDef } from 'zod';
import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';

type SchemaFunction = (valueEmail: string) => ZodType<{ email: string }, ZodTypeDef, { email: string }>;

const createSchema: SchemaFunction = (valueEmail) =>
  z.object({
    email: EMAIL_VALIDATION_SCHEMA.refine(
      (email) => email !== valueEmail,
      'The entered email is the same as the current email.',
    ),
  });

export type EmailFormValues = z.infer<ReturnType<typeof createSchema>>;

export default function EmailForm({ isOpen, onClose }: FormModal): JSX.Element {
  const { version, setUpdatedEmail, valueEmail } = useCustomerInfo();
  const schema = createSchema(valueEmail);
  const { register, handleSubmit, formState, watch, reset } = useForm<EmailFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { errors, isDirty, isValid, isSubmitting } = formState;
  const [formEmailError, setFormEmailError] = useState<string>('');
  const { setIsShown } = showModalMessage();
  const { setErrorIsShown } = showErrorMessage();

  const newEmail = watch('email');

  useEffect(() => {
    setFormEmailError('');
  }, [newEmail]);

  const onSubmit = async (data: EmailFormValues): Promise<void> => {
    const body: MyCustomerUpdateAction[] = [
      {
        action: 'changeEmail',
        email: data.email.toLowerCase(),
      },
    ];
    console.log(body);
    await updateCustomer(version, body)
      .then((response) => {
        const customerInfo = {
          valueEmail: response.email,
          version: response.version,
        };
        setUpdatedEmail(customerInfo);
        setIsShown(true);
        onClose();
        reset();
      })
      .catch((error: Error) => {
        setFormEmailError('');

        if (error.message.includes(ERROR_TYPES.VERSION_ERROR)) {
          setFormEmailError(VERSION_ERROR_MESSAGE);
        } else if (error.message.includes(ERROR_TYPES.INVALID_REFRESH_TOKEN)) {
          setErrorIsShown(true);
        } else {
          setFormEmailError(error.message);
        }
      });
  };

  return (
    <ModalProfile isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={style['email-form']} data-testid="email-form" noValidate>
        <FormTitle title="Change Email" isIcon={false} />
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
