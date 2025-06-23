'use client';

import { green, orange } from "@/lib/custom-color";
import formatCurrency from "@/lib/format-currency";
import { Icon } from "@iconify/react";
import { TextField, Typography, Divider, IconButton } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

export default function BEPModalInput({
  defaultValue,
  onSubmitChange,
}: {
  defaultValue: number;
  onSubmitChange?: (value: number) => void;
}) {
  const [value, setValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const textFieldRef = useRef<HTMLInputElement>(null);

  const formatedValue = useMemo(() => {
    return formatCurrency(value, {
      maximumFractionDigits: 0,
    });
  }, [value])

  const handleEditClick = () => {
    setIsEditing(prev => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatedStringValue = e.target.value
      .replace(/[^0-9]+/g, "")
    const newValue = parseFloat(formatedStringValue);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  }

  useEffect(() => {
    if (isEditing) {
      textFieldRef.current?.focus();
      textFieldRef.current?.select();
    }

    if (!isEditing && textFieldRef.current) {
      const value = parseFloat(textFieldRef.current.value.replace(/[^0-9]+/g, ""));
      if (!isNaN(value) && onSubmitChange) {
        onSubmitChange(value);
      }
    }
  }, [isEditing]);

  return (
    <TextField
      inputRef={textFieldRef}
      disabled={!isEditing}
      inputMode="numeric"
      value={formatedValue}
      onChange={handleChange}
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
                {isEditing ? (
                  <Icon icon="mdi:check" color={green[500]} />
                ) : (
                  <Icon icon="mdi:pencil" color={orange[500]} />
                )}
              </IconButton>
            </>
          ),
        },
      }}
    />
  )
}