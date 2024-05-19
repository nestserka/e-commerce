import type { InputProps } from './types';

export const getInputProps = (type: string, id: string, placeholder: string, autoComplete: string): InputProps => ({
  type,
  id,
  placeholder,
  autoComplete,
});

export interface ErrorLoginForm {
  error: {
    isForm?: boolean;
    isEmail?: boolean;
    isPassword?: boolean;
    message: string;
  };
}

export function handleLoginError(count: number | undefined): ErrorLoginForm {
  if (count !== undefined && count === 0) {
    return {
      error: {
        isEmail: true,
        message: 'Invalid email: There is no such user registered',
      },
    };
  }

  if (count !== undefined && count > 0) {
    return {
      error: {
        isPassword: true,
        message: 'Invalid password: You provided wrong password',
      },
    };
  }

  return {
    error: {
      isForm: true,
      message: 'Form error',
    },
  };
}
