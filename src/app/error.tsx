'use client';

import { useEffect } from 'react';
import { Typography, Button, Container, Stack } from '@mui/material';
import { Icon } from '@iconify/react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: "25vh" }}>
      <Stack spacing={4} alignItems="center">
        <Icon icon="material-symbols:error-outline-rounded" width={80} height={80} color="red" />

        <Typography variant="h4" fontWeight={600}>
          Terjadi Kesalahan
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Maaf, terjadi kesalahan saat memuat halaman. Hubungi tim dukungan kami jika masalah ini terus berlanjut.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="orange"
            onClick={() => reset()}
          >
            Coba Lagi
          </Button>

          <Button
            variant="outlined"
            color="black"
            onClick={() => window.location.href = '/'}
          >
            Kembali ke Beranda
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
