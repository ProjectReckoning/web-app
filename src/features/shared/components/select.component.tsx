'use client'

import {
  SelectChangeEvent,
  SelectProps,
  Select as SelectUi,
} from '@mui/material';
import { useState } from 'react';

export default function Select({
  defaultValue = '',
  onChange,
  children,
  ...props
}: Omit<SelectProps, 'value' | 'onChange'> & {
  onChange?: (event: SelectChangeEvent) => void;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue)
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <SelectUi
      value={value}
      onChange={handleChange}
      {...props}
    >
      {children}
    </SelectUi>
  )
}