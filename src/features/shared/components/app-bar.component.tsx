'use client';

import React from 'react';
import { styled, Theme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Button, Skeleton, useMediaQuery } from '@mui/material';
import { purple } from '@/lib/custom-color';
import { Icon } from '@iconify/react';
import { PocketMenuItem } from '../entities/pocket-menu-item';
import NotificationButton from '@/features/notification/components/notification-button.component';

const drawerWidth = 300;

interface CustomAppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<CustomAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 0,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 48,
  width: `calc(100% - 48px)`,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface AppbarComponentProps {
  isOpen: boolean;
  selectedPocketId: string;
  pockets: PocketMenuItem[];
  isLoading: boolean;
  onLogout: () => void;
}

const Appbar: React.FC<AppbarComponentProps> = ({
  isOpen,
  selectedPocketId,
  isLoading = false,
  pockets,
  onLogout
}) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const currentPocket = pockets.find(p => p.id === selectedPocketId);
  const displayPocketName = currentPocket?.name ?? '';
  const displayPocketColor = currentPocket?.color ?? purple[500];

  return (
    <StyledAppBar position="fixed" open={isOpen} sx={{ boxShadow: 0, borderBottom: 1, borderColor: 'border.main' }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="600" component="h2" paddingX={2}>
          <Box sx={{ display: { xs: "none", sm: "inline" } }} fontWeight="600" component="span">
            Pocket Saat Ini : {' '}
          </Box>
          <Box color={displayPocketColor} fontWeight="600" component="span">
            {isLoading ? (
              <Skeleton sx={{ display: "inline-block" }} width={150} />
            ) : displayPocketName}
          </Box>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NotificationButton />

          <Button
            startIcon={<Icon icon="eva:log-out-fill" style={{ color: 'black' }} />}
            aria-label="Keluar"
            variant="text"
            onClick={onLogout}
            sx={{ color: "MenuText", border: 1, borderColor: "border.main" }}
          >
            <Typography variant="body2" sx={{ mt: 0.25 }}>
              Keluar
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Appbar;