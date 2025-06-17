// @/components/Appbar.tsx
'use client';

import React from 'react';
import { styled, Theme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box, Button, useMediaQuery } from '@mui/material';
import { purple } from '@/lib/custom-color';
import { PocketEntity } from '@/features/pocket/entities/pocket.entites';
import { Icon } from '@iconify/react';

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
  pockets: PocketEntity[];
  onLogout: () => void;
}

const Appbar: React.FC<AppbarComponentProps> = ({ isOpen, selectedPocketId, pockets, onLogout }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const currentPocket = pockets.find(p => p.id === selectedPocketId);
  const displayPocketName = currentPocket?.name || 'Pilih Pocket';
  const displayPocketColor = currentPocket?.color || purple[500];

  return (
    <StyledAppBar position="fixed" open={isOpen} sx={{ boxShadow: 0, borderBottom: 1, borderColor: 'border.main' }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="600" component="h2" paddingX={2}>
          <Box sx={{ display: { xs: "none", sm: "inline" } }} fontWeight="600" component="span">
            Pocket Saat Ini : {' '}
          </Box>
          <Box color={displayPocketColor} fontWeight="600" component="span">
            {displayPocketName}
          </Box>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton aria-label="notification" sx={{ border: "solid 1px gray" }}>
            <Icon icon="eva:bell-outline" style={{ color: 'black' }} />
          </IconButton>

          <Button
            startIcon={<Icon icon="eva:log-out-fill" style={{ color: 'black' }} />}
            aria-label="Keluar"
            variant="text"
            onClick={onLogout}
            sx={{ color: "MenuText", border: "solid 1px gray" }}
          >
            <Typography variant="body2" sx={{ mt: 0.25}}>
              Keluar
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Appbar;