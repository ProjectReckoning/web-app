import * as React from 'react';
import { Box } from '@mui/material';
import { purple } from '@/lib/custom-color';

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", backgroundColor: purple[500] }}>
          <Box component="main" sx={{
            flex: 1, borderTopRightRadius: {
              xs: 0,
              md: 70,
            }, borderBottomRightRadius: {
              xs: 0,
              md: 70,
        }, backgroundColor: "white", height: "100vh", padding: {
          xs: 2,
          sm: 4,
        }
          }}>
            <Box
              component="img"
              src="/images/logo.png"
              alt="Logo"
            />
            {props.children}
          </Box>

          <Box
            component="img"
            src="/images/login-ilustration.png"
            alt="Logo"
            sx={{
              maxWidth: "50vw",
              maxHeight: "90vh",
              objectFit: "contain",
              flex: {
                sm: 0,
                lg: 2,
              },
              display: {
                xs: "none",
                md: "block",
              },
            }}
          />
    </Box>
  );
}