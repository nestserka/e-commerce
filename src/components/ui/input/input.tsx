import { useState } from 'react';
import styles from './_input.modul.scss';

interface InputProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Input({ type, name, id, placeholder, label, value, onChange }: InputProps): JSX.Element {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className={styles.input}
      ></input>
    </>
  );
}
