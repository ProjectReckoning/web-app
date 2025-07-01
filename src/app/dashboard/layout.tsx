'use client';

import { Box, Container, Toolbar } from '@mui/material';
import Header from '@/features/shared/components/header.component';
import pocketStore from '@/features/pocket/stores/pocket.store';
import { useEffect } from 'react';
import Loading from '@/features/shared/components/loading.component';
import notificationStore from '@/features/notification/stores/notification.store';
import authStore from '@/features/auth/stores/auth.store';

export default function Layout(props: Readonly<{ children: React.ReactNode }>) {
  const { isLoading, pockets, getAllPockets } = pocketStore();
  const { token, user } = authStore()
  const { getAllNotifications } = notificationStore()

  useEffect(() => {
    getAllPockets();
    getAllNotifications()
  }, [token, user]);

  if (isLoading || !pockets) {
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

