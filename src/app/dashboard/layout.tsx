'use client';

import { Box, Container, Toolbar } from '@mui/material';
import Header from '@/features/shared/components/header.component';
import pocketStore from '@/features/pocket/stores/pocket.store';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout(props: Readonly<{ children: React.ReactNode }>) {
  const { pockets, getAllPockets } = pocketStore();
  const pathname = usePathname();

  useEffect(() => {
    if (!pockets.length) {
      getAllPockets();
      return;
    }
  }, [pathname]);

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

