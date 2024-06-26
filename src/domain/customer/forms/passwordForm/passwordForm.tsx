import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';

import style from '../_forms.module.scss';
import { ERROR_TYPES, PASSWORD_VALIDATION_SCHEMA } from '../../../../constants/constants';
import FormTitle from '../../../../components/formTitle/FormTitle';
import {
  inputConfirmPasswordProps,
  inputCurrentPasswordProps,
  inputNewPasswordProps,
} from '../../../../utils/inputProps';
import ErrorMessage from '../../../../components/errorMessage/ErrorMessage';
import ModalProfile from '../../../../components/modalProfile/ModalProfile';
import { type FormModal, VERSION_ERROR_MESSAGE } from '../../../../utils/types';
import InputPassword from '../../../../components/ui/inputPassword/inputPassword';
import { showErrorMessage, showModalMessage, useCustomerInfo, useLoginData } from '../../../../core/state/userState';
import updateCustomerPassword from '../../../../api/me/changePassword';
import loginUser from '../../../../api/me/loginUser';

import type { CustomerChangePassword } from '@commercetools/platform-sdk';

const schema = z
  .object({
    currentPassword: PASSWORD_VALIDATION_SCHEMA,
    newPassword: PASSWORD_VALIDATION_SCHEMA,
    confirmPassword: PASSWORD_VALIDATION_SCHEMA,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password does not match',
    path: ['confirmPassword'],
  });

export type PasswordFormValues = z.infer<typeof schema>;

export default function PasswordForm({ isOpen, onClose }: FormModal): JSX.Element {
  const { version, setValueVersion, valueEmail } = useCustomerInfo();
  const { customerId } = useLoginData();
  const { register, handleSubmit, formState, watch, trigger, reset } = useForm<PasswordFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { errors, isDirty, isValid, isSubmitting } = formState;
  const { setIsShown } = showModalMessage();
  const [formPasswordError, setFormPasswordError] = useState<string>('');
  const { setErrorIsShown } = showErrorMessage();

  const valuePassword = watch('currentPassword');

  useEffect(() => {
    setFormPasswordError('');
  }, [valuePassword]);

  useEffect(() => {
    const subscription = watch((_value, { name }) => {
      if (name === 'newPassword') {
        trigger(['newPassword', 'confirmPassword']).catch((error) => {
          console.error('Error triggering newPassword or confirmPassword:', error);
        });
      }
    });

    return (): void => {
      subscription.unsubscribe();
    };
  }, [watch, trigger]);

  const onSubmit = async (data: PasswordFormValues): Promise<void> => {
    const body: CustomerChangePassword = {
      id: customerId,
      version,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    await updateCustomerPassword(body)
      .then(async (response) => {
        setValueVersion(response.version);
        setIsShown(true);
        onClose();
        reset();
        await loginUser(valueEmail, body.newPassword);
      })
      .catch((error: Error) => {
        setFormPasswordError('');

        if (error.message.includes(ERROR_TYPES.VERSION_ERROR)) {
          setFormPasswordError(VERSION_ERROR_MESSAGE);
        } else if (error.message.includes(ERROR_TYPES.INVALID_REFRESH_TOKEN)) {
          setErrorIsShown(true);
        } else {
          setFormPasswordError(error.message);
        }
      });
  };

  return (
    <ModalProfile isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={style['password-form']} data-testid="password-form" noValidate>
        <FormTitle title="Change Password" isIcon={false} />
        <section className={style['input-section']}>
          <InputPassword
            inputProps={{
              ...register('currentPassword'),
              ...inputCurrentPasswordProps,
            }}
            label="Current Password "
          />
          {errors.currentPassword && <ErrorMessage message={errors.currentPassword.message} />}
          {formPasswordError && <ErrorMessage message={formPasswordError} />}
        </section>

        <section className={style['input-section']}>
          <InputPassword
            inputProps={{
              ...register('newPassword'),
              ...inputNewPasswordProps,
            }}
            label="Enter New Password "
          />
          {errors.newPassword && <ErrorMessage message={errors.newPassword.message} />}
        </section>

        <section className={style['input-section']}>
          <InputPassword
            inputProps={{
              ...register('confirmPassword'),
              ...inputConfirmPasswordProps,
            }}
            label="Confirm New Password "
          />
          {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message} />}
        </section>

        <button type="submit" className="button-primary" disabled={!isDirty || !isValid || isSubmitting}>
          Change Password
        </button>
      </form>
    </ModalProfile>
  );
}
