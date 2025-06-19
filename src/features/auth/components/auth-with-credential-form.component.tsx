'use client';

import { gray } from "@/lib/custom-color";
import { Box, TextField, InputAdornment, Typography, Button } from "@mui/material";
import { useState } from "react";
import authStore from "../stores/auth.store";
import { Icon } from "@iconify/react";

export default function AuthWithCredentialForm({ phoneNumber, setPhoneNumber }: { phoneNumber: string, setPhoneNumber: (value: string) => void }) {
  const { isLoading, errorMessage, loginWithCredential } = authStore();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginWithCredential(phoneNumber, password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D+/g, '');
    setPhoneNumber(raw);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        required
        label="Nomor HP"
        variant="outlined"
        type="tel"
        prefix='+62'
        autoComplete="tel"
        inputMode="tel"
        value={phoneNumber}
        onChange={handleChange}
        slotProps={{
          htmlInput: {
            pattern: "[0-9]{10,15}",
            title: "Masukkan nomor HP yang benar (10-15 digit angka) diawali dengan +62",
          },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                +62
              </InputAdornment>
            ),
          },
        }}
        sx={{
          ".MuiOutlinedInput-input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 999px background inset !important",
            WebkitTextFillColor: "inherit !important",
          },
        }}
      />

      <TextField
        required
        label="Password"
        variant="outlined"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          ".MuiOutlinedInput-input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 999px background inset !important",
            WebkitTextFillColor: "inherit !important",
          },
        }}
      />

      <Typography variant="body2" component="span" color='red' textAlign="center" sx={{ display: errorMessage ? "block" : "none" }}>
        {errorMessage}
      </Typography>

      <Box sx={{
        display: "flex", flexDirection: "column", gap: 2, width: {
          xs: "100%",
          sm: "fit-content",
        }, margin: "auto", marginTop: 4
      }}>
        <Button
          type="submit"
          loading={isLoading}
          aria-label="Masuk"
          color='tosca'
          variant='contained'
          sx={{ padding: "8px 48px" }}
        >
          <Typography variant="body2" component="span">
            Masuk
          </Typography>
        </Button>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box component="hr" flex={1} borderColor='border.main'></Box>
          <Typography color={gray[400]} variant="body2" component="span">
            atau
          </Typography>
          <Box component="hr" flex={1} borderColor='border.main'></Box>
        </Box>

        <Button
          disabled={isLoading}
          endIcon={<Icon icon="mdi:qrcode-scan" style={{ fontSize: 24 }} />}
          aria-label="Masuk dengan QR"
          color='limeGreen'
          variant='contained'
          sx={{ padding: "8px 48px" }}
        >
          <Typography variant="body2" component="span">
            Masuk dengan QR
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}