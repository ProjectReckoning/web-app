import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Page() {
  return (
    <Box
      sx={{
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        gap: 2,
      }}
    >
      <Box
        component="img"
        src="/images/dashboard-null-pocket-illustration.png"
        alt="Logo"
        maxWidth='100%'
      />
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography variant="h5" fontWeight={600} component="h2">
          <Box component="span" color="purple.main">Uh-oh!</Box>
          <Box component="span" color="purple"> Sepertinya kamu belum pilih </Box>
          <Box component="span" borderBottom={4} borderColor="tosca.main" borderRadius={1}>Pocket</Box>
        </Typography>
        <Typography variant="h6" component="h2">
          Pilih dulu ya untuk lihat riwayat transaksimu!
        </Typography>

      </Box>
    </Box>
  );
}
