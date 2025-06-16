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
          <Box component="span" color="purple.main">Uh-oh! {' '}</Box>
          <Box component="span" color="purple">Kamu belum jadi {' '}</Box>
          <Box component="span" borderBottom={4} borderColor="tosca.main" borderRadius={1}>admin di Pocket</Box>
          <Box component="span">{' '} manapun</Box>
        </Typography>
        <Typography variant="h6" component="h2" marginTop={1}>
          <Box component="span">Buat {' '}</Box>
          <Box component="span" fontWeight="bold" borderBottom={4} borderColor="purple.main" borderRadius={1}>Pocket {' '}</Box>
          <Box component="span">kamu di {' '}</Box>
          <Box component="span" color="orange.main" borderBottom={4} borderColor="tosca.main" borderRadius={1}>wondr {' '}</Box>
          <Box component="span">ya!</Box>
        </Typography>

      </Box>
    </Box>
  );
}
