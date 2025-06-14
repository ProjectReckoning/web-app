import * as React from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import Header from '@/features/shared/components/header';

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
        <Container maxWidth="xl">
          {props.children}
        </Container>
      </Box>
    </>
  );
}
