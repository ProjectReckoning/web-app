'use client';

import { orange } from "@/lib/custom-color";
import formatCurrency from "@/lib/format-currency";
import { Icon } from "@iconify/react";
import { TextField, Typography, Divider, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function BEPModalInput({
  defaultValue,
  onChange,
}: {
  defaultValue: number;
  onChange?: (value: number) => void;
}) {
  const [value, setValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing(prev => !prev);
  };

  useEffect(() => {
    if (isEditing) {
      textFieldRef.current?.focus();
      textFieldRef.current?.select();
    }

    if (!isEditing && textFieldRef.current) {
      const value = parseFloat(textFieldRef.current.value.replace(/[^0-9.-]+/g, ""));
      if (!isNaN(value) && onChange) {
        onChange(value);
      }
    }
  }, [isEditing]);

  return (
    <TextField
      inputRef={textFieldRef}
      disabled={!isEditing}
      inputMode="numeric"
      value={isEditing ? value : formatCurrency(value)}
      onChange={(e) => {
        const value = parseFloat(e.target.value.replace(/[^0-9.-]+/g, ""));
        setValue(value)
      }}
      variant="outlined"
      sx={{
        borderRadius: 4,
        '& .MuiOutlinedInput-root': {
          borderRadius: 4,
          paddingLeft: 0,
          fontWeight: 600,
          overflow: 'hidden',
          color: 'black!important',
          '& fieldset': {
            borderColor: 'border.main',
          },
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <Typography sx={{
              mr: 1,
              px: 3,
              fontWeight: 600,
              backgroundColor: "limeGreen.light",
              height: "100%",
              display: "flex",
              alignItems: "center"
            }}>Modal
            </Typography>
          ),
          endAdornment: (
            <>
              <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
              <IconButton onClick={handleEditClick}>
                <Icon icon="ph:pencil-simple-bold" style={{ fontSize: 24, color: orange[500] }} />
              </IconButton>
            </>
          ),
        },
      }}
    />
  )
}