// @/components/Drawer.tsx
'use client';

import React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, SelectChangeEvent } from '@mui/material';
import PocketSelect, { PocketMenuItem } from './pocket-select.component';
import { Icon } from '@iconify/react';
import { orange } from '@/lib/custom-color';

export interface DrawerMenuItem {
  name: string;
  icon: React.ReactElement;
  href: string;
}

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface DrawerComponentProps {
  isOpen: boolean;
  onToggleDrawer: () => void;
  pockets: PocketMenuItem[];
  selectedPocketId: string;
  onPocketChange: (event: SelectChangeEvent<string>) => void;
  menus: DrawerMenuItem[];
  pathname: string;
  onNavigate: (href: string) => void;
}

export default function Drawer({
  isOpen,
  onToggleDrawer,
  pockets,
  selectedPocketId,
  onPocketChange,
  menus,
  pathname,
  onNavigate,
}: DrawerComponentProps) {
  return (
    <StyledDrawer variant="permanent" open={isOpen}>
      <DrawerHeader sx={{ justifyContent: isOpen ? "space-between" : "center", height: 84 }}>
        <Box
          component="img"
          src="/images/logo.png"
          alt="Logo"
          height={48}
          sx={{ display: isOpen ? "block" : "none" }}
        />
        <IconButton onClick={onToggleDrawer} color='purple'>
          {isOpen
            ? <Icon icon="mdi:chevron-left" style={{ fontSize: 24 }} />
            : <Icon icon="mdi:menu" style={{ fontSize: 24 }} />
          }
        </IconButton>
      </DrawerHeader>

      <PocketSelect
        pockets={pockets}
        selectedPocketId={selectedPocketId}
        onPocketChange={onPocketChange}
        isOpen={isOpen}
      />

      <List sx={{ marginTop: 2 }}>
        {menus.map((menu) => (
          <ListItem
            key={menu.name}
            disablePadding
            sx={{
              display: 'block',
              paddingX: isOpen ? 2 : 0,
              paddingY: 0.5,
              '& .Mui-selected': {
                backgroundColor: `${orange[500]} !important`,
                color: 'white',
              },
              '.Mui-selected .MuiListItemIcon-root': {
                color: 'white',
              },
            }}>
            <ListItemButton
              onClick={() => onNavigate(menu.href)}
              selected={pathname.includes(menu.href)}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                  borderRadius: 999,
                },
                isOpen
                  ? {
                    justifyContent: 'initial',
                  }
                  : {
                    justifyContent: 'center',
                  },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  isOpen
                    ? {
                      mr: 3,
                    }
                    : {
                      mr: 'auto',
                    },
                ]}
              >
                {menu.icon}
              </ListItemIcon>
              <ListItemText
                primary={menu.name}
                sx={[
                  isOpen
                    ? {
                      opacity: 1,
                    }
                    : {
                      opacity: 0,
                    },
                ]}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};