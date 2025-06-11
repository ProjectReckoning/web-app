import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { purple } from '@/lib/custom-color';
import { Button, TextField, Toolbar } from '@mui/material';
import { QrCodeScanner } from '@mui/icons-material';

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Toolbar />
      <Typography variant="h4" component="h2" fontWeight={600} textAlign="center">
        Masuk <Typography fontWeight={600} variant="h4" component="span" sx={{ borderBottomColor: purple[500], borderBottomWidth: 4, borderBottomStyle: "solid" }}>
          Pocket
        </Typography>
      </Typography>

      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField label="Email" variant="outlined" type="email" />
        <TextField label="Password" variant="outlined" type="password" />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%", margin: "auto", marginTop: 4 }}>
          <Button
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
            endIcon={<QrCodeScanner />}
            aria-label="Masuk"
            color='limeGreen'
            variant='contained'
            sx={{
              padding: "8px 48px",
            }}
          >
            <Typography variant="body2" component="span">
              Masuk
            </Typography>
          </Button>

        </Box>
      </Box>
    </Container >
  );
}
