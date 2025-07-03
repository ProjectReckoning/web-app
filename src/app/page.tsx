import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Loading from '@/features/shared/components/loading.component';

export default function Home() {


  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
        }}
      >
        <Loading />

      </Box>
    </Container>
  );
}
