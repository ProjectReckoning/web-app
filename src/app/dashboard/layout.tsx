import * as React from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import Header from '@/features/shared/components/header.component';

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />

      <Box
        component="main"
        sx={{
          ml: {
            xs: 7,
            sm: 8,
          }
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ my: 8 }}>
          {props.children}
        </Container>
      </Box>
    </>
  );
}
