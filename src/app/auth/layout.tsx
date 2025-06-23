import * as React from 'react';
import { Box, Container } from '@mui/material';
import { purple } from '@/lib/custom-color';

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", backgroundColor: purple[500] }}>
      <Box component="div" sx={{
        flex: 2,
        borderTopRightRadius: {
          xs: 0,
          md: 70,
        }, borderBottomRightRadius: {
          xs: 0,
          md: 70,
        }, 
        backgroundColor: "white", 
        height: "100vh", 
        padding: {
          xs: 2,
          lg: 4,
        },
        display: "flex",
        flexDirection: "column",
      }}>
        <Box
          flex={0}
          width={128}
          component="img"
          src="/images/logo.png"
          alt="Logo"
        />
        <Container 
          maxWidth="sm" 
          sx={{ 
            display: "flex", 
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            flex: 1,
          }}>
          {props.children}
        </Container>
      </Box>

      <Box
        sx={{
          flex: 3,
          display: {
            xs: "none",
            md: "block",
          },
        }}>
        <Box
          component="img"
          src="/images/login-ilustration.png"
          alt="Logo"
          sx={{
            width: "100%",
            maxHeight: "90vh",
            objectFit: "contain",
          }}
        />

      </Box>
    </Box>
  );
}