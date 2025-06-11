'use client'

import {
  SelectChangeEvent,
  Select as SelectUi,
} from '@mui/material';
import { purple } from '@mui/material/colors';
import { useState } from 'react';

export default function Select({
  defaultValue = '',
  children,
}: Readonly<{
  defaultValue?: string;
  children: React.ReactNode[];
}>) {
  const [value, setValue] = useState(defaultValue)
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <SelectUi
      value={value}
      onChange={handleChange}
      sx={{ borderRadius: 99, backgroundColor: purple[500], }}
    >
      {children}
    </SelectUi>
  )
}