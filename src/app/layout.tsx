import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AuthGuard } from '@/features/shared/components/auth-guard';

export default async function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
            <AuthGuard>
              <CssBaseline />
              {props.children}
            </AuthGuard>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
