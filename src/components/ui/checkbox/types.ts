export interface InputCheckboxProps {
  name: string;
  id: string;
  label: string;
  isCheckBoxDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValue?: boolean;
}
