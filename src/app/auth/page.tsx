'use client'

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { purple } from '@/lib/custom-color';
import { Button, TextField, Toolbar } from '@mui/material';
import { QrCodeScanner } from '@mui/icons-material';
import authStore from '@/features/auth/stores/auth';
import { useState } from 'react';

export default function Home() {
  const { isLoading, errorMessage, loginWithCredential } = authStore();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginWithCredential(phoneNumber, password);
  };

  return (
    <Container maxWidth="xs">
      <Toolbar />
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
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          slotProps={{
            htmlInput: {
              pattern: "\\+62[0-9]{10,15}",
              title: "Masukkan nomor HP yang benar (10–15 digit angka) diawali dengan +62",
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
            <Box component="hr" flex={1} borderColor="gray"></Box>
            <Typography color='gray' variant="body2" component="span">
              Atau
            </Typography>
            <Box component="hr" flex={1} borderColor="gray"></Box>
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
    </Container>
  );
}
