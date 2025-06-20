"use client";

import { Box, TextField, Button, Typography, BoxProps } from "@mui/material";
import { useState } from "react";
import { Icon } from "@iconify/react";
import detailPocketStore from "@/features/pocket/stores/detail-pocket.store";
import { POCKET_COLOR_OPTIONS } from "../constants/pocket-color-option.constant";
import { POCKET_ICON_OPTIONS } from "../constants/pocket-icon-option.constant";
import IconButton from "@mui/material";

interface FormEditPocketProps {
  defaultTitle: string;
  defaultColor: string;
  defaultIcon: string;
  onSave: () => void;
  onChange?: ({
    title,
    color,
    icon,
  }: {
    title: string;
    color: string;
    icon: string;
  }) => void;
}

export default function FormEditPocket({
  defaultTitle,
  defaultColor,
  defaultIcon,
  onSave,
  onChange,
  ...props
}: Omit<BoxProps, "onChange"> & FormEditPocketProps) {
  const [title, setTitle] = useState(defaultTitle);
  const [color, setColor] = useState(defaultColor);
  const [icon, setIcon] = useState(defaultIcon);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setColor(e.target.value);
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIcon(e.target.value);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      gap={4}
      position="relative"
      overflow="hidden"
      color="white"
      {...props}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        flexWrap="wrap"
        marginBottom={2}
        gap={1}
      >
        <Typography variant="body2" component="span" color="black">
          Nama Pocket
        </Typography>
        <TextField
          required
          // label="Nama Pocket"
          // variant="outlined"
          type="tel"
          inputMode="tel"
          value={title}
          onChange={(e) => {
            const newTitle = e.target.value;
            setTitle(newTitle);
            onChange?.({ title: newTitle, color, icon });
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        marginBottom={2}
        gap={1}
      >
        <Typography variant="body2" component="span" color="black">
          Warna Pocket
        </Typography>
        <Box
          display="flex"
          sx={{
            gap: 5,
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 5,
            padding: 5,
            width: "100%",
            minWidth: 500,
          }}
        >
          {/* Mapp the box with the color */}
          {POCKET_COLOR_OPTIONS.map((option) => (
            <Box
              key={option.value}
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: option.value,
                cursor: "pointer",
                border:
                  color === option.value
                    ? "1px solid black"
                    : "1px solid transparent",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  border: "1px solid black",
                  boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={() => {
                setColor(option.value);
                onChange?.({ title, color: option.value, icon });
              }}
            />
          ))}
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        marginBottom={2}
        gap={1}
      >
        <Typography variant="body2" component="span" color="black">
          Icon Pocket
        </Typography>
        <Box
          display="flex"
          sx={{
            gap: 5,
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 5,
            padding: 5,
            width: "100%",
            minWidth: 500,
          }}
        >
          {POCKET_ICON_OPTIONS.map((option) => (
            <Box
              key={option.value}
              onClick={() => {
                setIcon(option.value);
                onChange?.({ title, color, icon: option.value });
              }}
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                color: "white",
                border:
                  icon === option.value
                    ? "1px solid black"
                    : "1px solid transparent",
                boxShadow:
                  icon === option.value ? "0 0 0 2px rgba(0,0,0,0.3)" : "none",
                "&:hover": {
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
                  border: "1px solid black",
                },
              }}
            >
              <Icon icon={option.value} width={24} height={24} />
            </Box>
          ))}
        </Box>
      </Box>
      <Button
        variant="outlined"
        size="small"
        startIcon={<Icon icon="ph:pencil-simple-bold" color="gray" />}
        onClick={() => console.log("Edit Pocket")}
        color="inherit"
        sx={{
          color: "#848688",
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 400,
          px: 1.5,
          py: 0.5,
          fontSize: 18,
          minWidth: 0,
        }}
      >
        Edit
      </Button>
    </Box>
  );
}
