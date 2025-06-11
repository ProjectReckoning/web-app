import * as React from 'react';
import { Sidebar } from '@/features/shared/components/sidebar';
import { Box, Toolbar } from '@mui/material';
import { Header } from '@/features/shared/components/header';

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        <Box sx={{ display: "flex" }}>
          <Sidebar />

          <Box component="main" sx={{ flexGrow: 1, }}>
            <Toolbar />
            {props.children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
