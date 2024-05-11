import type { InputProps } from './types';

export const getInputProps = (type: string, id: string, placeholder: string, autoComplete: string): InputProps => ({
  type,
  id,
  placeholder,
  autoComplete,
});
