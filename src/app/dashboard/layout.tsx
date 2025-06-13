import * as React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Header } from '@/features/shared/components/header';

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      {/* <Sidebar /> */}

      <Box component="main" sx={{ flexGrow: 1, }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
