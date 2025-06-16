'use client'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { gray, purple } from '@/lib/custom-color';
import { Button, InputAdornment, TextField } from '@mui/material';
import { QrCodeScanner } from '@mui/icons-material';
import authStore from '@/features/auth/stores/auth.store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  // TODO: change sessionId to token
  const { isLoading, errorMessage, sessionId, loginWithCredential } = authStore();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useRouter();

  useEffect(() => {
    if (sessionId) {
      navigate.push("/dashboard");
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginWithCredential(phoneNumber, password);
    navigate.push("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D+/g, '');
    setPhoneNumber(raw);
  };

  return (
    <>
      <Typography variant="h4" component="h2" fontWeight={600} textAlign="center">
        Masuk <Typography fontWeight={600} variant="h4" component="span" sx={{ borderBottomColor: purple[500], borderBottomWidth: 4, borderBottomStyle: "solid" }}>
          Pocket
        </Typography>
      </Typography>

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
        />

        <TextField
          required
          label="Password"
          variant="outlined"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            endIcon={<QrCodeScanner />}
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
    </>
  );
}
