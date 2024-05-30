import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import style from '../_forms.module.scss';
import { PASSWORD_VALIDATION_SCHEMA } from '../../../../constants/constants';
import FormTitle from '../../../../components/formTitle/FormTitle';
import { inputEmailProps } from '../../../../utils/inputProps';
import ErrorMessage from '../../../../components/errorMessage/ErrorMessage';
import ModalProfile from '../../../../components/modalProfile/ModalProfile';
import { type FormModal } from '../../../../utils/types';
import InputPassword from '../../../../components/ui/inputPassword/inputPassword';

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
  // const { version, setUpdatedEmail, valueEmail } = useCustomerInfo();
  const { register, handleSubmit, formState } = useForm<PasswordFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { errors, isDirty, isValid, isSubmitting } = formState;
  // const { setIsShown } = showModalMessage();

  const onSubmit = (data: PasswordFormValues): void => {
    console.log(data);
    // const body: MyCustomerUpdateAction[] = [
    //   {
    //     action: 'changeEmail',
    //     email: data.email.toLowerCase(),
    //   },
    // ];
    // api
    //   .updateCustomer(version, body)
    //   .then((response) => {
    //     const customerInfo = {
    //       valueEmail: response.body.email,
    //       version: response.body.version,
    //     };
    //     setUpdatedEmail(customerInfo);
    //     setIsShown(true);
    //     onClose();
    //     reset();
    //   })
    //   .catch((error: Error) => {
    //     setFormEmailError('');

    //     if (error.message.includes('different version')) {
    //       setFormEmailError(VERSION_ERROR_MESSAGE);
    //     } else {
    //       setFormEmailError(error.message);
    //     }
    //   });
  };

  return (
    <ModalProfile isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={style['password-form']} data-testid="password-form" noValidate>
        <FormTitle title="Change Password" isIcon={false} />
        <section className={style['input-section']}>
          <InputPassword
            inputProps={{
              ...register('currentPassword'),
              ...inputEmailProps,
            }}
            label="Current Password "
          />
          {errors.currentPassword && <ErrorMessage message={errors.currentPassword.message} />}
          {/* {formEmailError && <ErrorMessage message={formEmailError} />} */}
        </section>

        <section className={style['input-section']}>
          <InputPassword
            inputProps={{
              ...register('newPassword'),
              ...inputEmailProps,
            }}
            label="Enter New Password "
          />
          {errors.newPassword && <ErrorMessage message={errors.newPassword.message} />}
        </section>

        <section className={style['input-section']}>
          <InputPassword
            inputProps={{
              ...register('confirmPassword'),
              ...inputEmailProps,
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
