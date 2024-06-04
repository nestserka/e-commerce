import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

import style from '../_forms.module.scss';
import {
  ERROR_TYPES,
  FIRST_NAME_VALIDATION_SCHEMA,
  INPUT_DATE_VALIDATION_SCHEMA,
  LAST_NAME_VALIDATION_SCHEMA,
} from '../../../../constants/constants';
import FormTitle from '../../../../components/formTitle/FormTitle';
import ErrorMessage from '../../../../components/errorMessage/ErrorMessage';
import ModalProfile from '../../../../components/modalProfile/ModalProfile';
import { type FormModal, VERSION_ERROR_MESSAGE } from '../../../../utils/types';
import Input from '../../../../components/ui/input/input';
import { showErrorMessage, showModalMessage, useCustomerInfo } from '../../../../core/state/userState';
import { formatDateOfBirth, getInputProps } from '../../../../utils/utils';
import { inputFirstNameProps, inputLastNameProps } from '../../../../utils/inputProps';
import updateCustomer from '../../../../api/me/updateCustomer';

import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';

const schema = z.object({
  firstName: FIRST_NAME_VALIDATION_SCHEMA,
  lastName: LAST_NAME_VALIDATION_SCHEMA,
  dateOfBirth: INPUT_DATE_VALIDATION_SCHEMA,
});

export type GeneralFormValues = z.infer<typeof schema>;

export default function PasswordForm({ isOpen, onClose }: FormModal): JSX.Element {
  const { version, firstName, lastName, dateOfBirth, setUpdatedGeneraValues } = useCustomerInfo();

  const { register, handleSubmit, formState, reset } = useForm<GeneralFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName,
      lastName,
      dateOfBirth,
    },
  });

  const { errors, isDirty, isValid, isSubmitting } = formState;
  const inputCalendarProps = getInputProps('birthday', 'birthday', '30.03.1990', 'off');
  const { setIsShown } = showModalMessage();
  const [formError, setFormError] = useState<string>('');
  const { setErrorIsShown } = showErrorMessage();

  const onSubmit = async (data: GeneralFormValues): Promise<void> => {
    const body: MyCustomerUpdateAction[] = [
      {
        action: 'setFirstName',
        firstName: data.firstName,
      },
      {
        action: 'setLastName',
        lastName: data.lastName,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: data.dateOfBirth,
      },
    ];
    await updateCustomer(version, body)
      .then((response) => {
        if (response.dateOfBirth) {
          const customerInfo = {
            firstName: response.firstName,
            lastName: response.lastName,
            version: response.version,
            dateOfBirth: formatDateOfBirth(response.dateOfBirth),
          };
          setUpdatedGeneraValues(customerInfo);
        }

        setIsShown(true);
        onClose();
        reset();
      })
      .catch((error: Error) => {
        setFormError('');

        if (error.message.includes(ERROR_TYPES.VERSION_ERROR)) {
          setFormError(VERSION_ERROR_MESSAGE);
        } else if (error.message.includes(ERROR_TYPES.INVALID_TOKEN)) {
          setErrorIsShown(true);
        } else if (error.message.includes(ERROR_TYPES.INVALID_JSON)) {
          setFormError('Something wrong with the data, try to insert again');
        } else {
          setFormError(error.message);
        }
      });
  };

  return (
    <ModalProfile isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={style['general-form']} data-testid="general-form" noValidate>
        <FormTitle title="Change Personal Info" isIcon={false} />
        {formError && <ErrorMessage message={formError} />}
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('firstName'),
              ...inputFirstNameProps,
            }}
            label="First Name "
          />
          {errors.firstName && <ErrorMessage message={errors.firstName.message} />}
        </section>
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('lastName'),
              ...inputLastNameProps,
            }}
            label="Your Last Name "
          />
          {errors.lastName && <ErrorMessage message={errors.lastName.message} />}
        </section>
        <section className={style['input-section']}>
          <Input
            inputProps={{
              ...register('dateOfBirth'),
              ...inputCalendarProps,
            }}
            label="Date Of Birth "
          />
          {errors.dateOfBirth && <ErrorMessage message={errors.dateOfBirth.message} />}
        </section>

        <button type="submit" className="button-primary" disabled={!isDirty || !isValid || isSubmitting}>
          Change Personal Info
        </button>
      </form>
    </ModalProfile>
  );
}
