'use client';

import { Box, Container, Toolbar } from '@mui/material';
import Header from '@/features/shared/components/header.component';
import authStore from '@/features/auth/stores/auth.store';
import Loading from '@/features/shared/components/loading.component';
import pocketStore from '@/features/pocket/stores/pocket.store';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout(props: Readonly<{ children: React.ReactNode }>) {
  const { isLoading } = authStore();
  const { pockets, getAllPockets } = pocketStore();
  const pathname = usePathname();

  useEffect(() => {
    if (!pockets.length) {
      getAllPockets();
      return;
    }
  }, [pathname]);

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

