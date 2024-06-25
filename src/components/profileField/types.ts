export interface ProfileFieldProps {
  title: string;
  onEditClick: () => void;
  inputVal: string;
  isAddress: boolean;
  isDefault: boolean;
  id?: string;
}
