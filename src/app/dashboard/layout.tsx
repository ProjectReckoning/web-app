'use client';

import * as React from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import Header from '@/features/shared/components/header.component';
import authStore from '@/features/auth/stores/auth.store';
import Loading from '@/features/shared/components/loading.component';

export default function Layout(props: Readonly<{ children: React.ReactNode }>) {
  const { isLoading } = authStore();

  if (isLoading) {
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
