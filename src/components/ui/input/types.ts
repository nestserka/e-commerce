import type { InputHTMLAttributes } from 'react';

export interface InputProps {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  isDisabled?: boolean;
}
