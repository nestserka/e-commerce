import type { InputProps } from './types';

export const getInputProps = (type: string, id: string, placeholder: string, autoComplete: string): InputProps => ({
  type,
  id,
  placeholder,
  autoComplete,
});

interface ErrorLoginForm {
  isEmail?: boolean;
  isPassword?: boolean;
  message: string;
}

export function handleError(count: number | undefined): ErrorLoginForm {
  if (count !== undefined && count === 0) {
    return {
      isEmail: true,
      message: 'Invalid email: There is no such user registered',
    };
  }

  return {
    isPassword: true,
    message: 'Invalid password: You provided wrong password',
  };
}
