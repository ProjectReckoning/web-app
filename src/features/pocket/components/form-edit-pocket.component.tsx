"use client";

import { Box, TextField, Button, Typography, BoxProps } from "@mui/material";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { POCKET_COLOR_OPTIONS } from "../constants/pocket-color-option.constant";
import { POCKET_ICON_OPTIONS } from "../constants/pocket-icon-option.constant";
import CustomIcon from "@/features/shared/components/custom-icon.component";

interface FormEditPocketProps {
  defaultTitle: string;
  defaultColor: string;
  defaultIcon: string;
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
  onChange,
  ...props
}: Omit<BoxProps, "onChange"> & FormEditPocketProps) {
  const [title, setTitle] = useState(defaultTitle);
  const [color, setColor] = useState(defaultColor);
  const [icon, setIcon] = useState(defaultIcon);

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
            // gap: { xs: 1, sm: 2, md: 3 },
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 5,
            padding: { xs: 2, sm: 3, md: 5 },
            width: "100%",
            minWidth: 300,
            justifyContent: "space-around",
          }}
        >
          {/* Mapp the box with the color */}
          {POCKET_COLOR_OPTIONS.map((option) => (
            <Box
              key={option.value}
              sx={{
                width: { xs: 30, sm: 40, md: 48 },
                height: { xs: 30, sm: 40, md: 48 },
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
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 5,
            padding: { xs: 2, sm: 3, md: 5 },
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {POCKET_ICON_OPTIONS.map((option) => (
            <Box
              key={option}
              onClick={() => {
                setIcon(option);
                onChange?.({ title, color, icon: option });
              }}
              sx={{
                width: { xs: 30, sm: 40, md: 48 },
                height: { xs: 30, sm: 40, md: 48 },
                borderRadius: "50%",
                bgcolor: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                color: "white",
                border:
                  icon === option ? "1px solid black" : "1px solid transparent",
                boxShadow:
                  icon === option ? "0 0 0 2px rgba(0,0,0,0.3)" : "none",
                "&:hover": {
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
                  border: "1px solid black",
                },
              }}
            >
              <CustomIcon name={option} width={24} height={24} />
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
