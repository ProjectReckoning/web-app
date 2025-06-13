'use client'

import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, Button, Icon, MenuItem } from '@mui/material';
import { HomeOutlined, LogoutRounded, NotificationsNoneRounded, PeopleOutlineRounded, SendOutlined, SettingsOutlined } from '@mui/icons-material';
import { useState } from 'react';
import authStore from '@/features/auth/stores/auth';
import { usePathname, useRouter } from 'next/navigation';
import Select from './select';
import { Pocket } from '../entities/pocket';
import { purple } from '@/lib/custom-color';

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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 0,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: drawerWidth,
  width: `calc(100% - 48px)`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const menus = [
  { text: 'Beranda', icon: <HomeOutlined />, href: '/dashboard' },
  { text: 'Transaksi', icon: <SendOutlined />, href: '#' },
  { text: 'Anggota', icon: <PeopleOutlineRounded />, href: '#' },
  { text: 'Pengaturan', icon: <SettingsOutlined />, href: '#' },
]

const pockets: Pocket[] = [
  { name: 'Pilih Pocket', color: purple[500], icon: 'wallet' },
  { name: 'Dompet Utama', color: '#4A90E2', icon: 'wallet' },
  { name: 'Dompet Cadangan', color: '#50E3C2', icon: 'home' },
  { name: 'Dompet Investasi', color: '#F5A623', icon: 'wallet' },
]

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [pocket, setPocket] = useState<Pocket>(pockets[0]);
  const { logout } = authStore();
  const router = useRouter();
  const pathname = usePathname();

  const toggleDrawerState = () => {
    setOpen((value) => !value);
  };

  const handleLogout = () => {
    logout();
    router.replace('/auth');
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight="600" component="h2" paddingX={2}>
            Pocket Saat Ini : <Typography variant="h5" color='purple' fontWeight="600" component="span">
              Semua Pocket
            </Typography>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton aria-label="notification" sx={{ border: "solid 1px gray" }}>
              <NotificationsNoneRounded />
            </IconButton>

            <Button
              startIcon={<LogoutRounded />}
              aria-label="Keluar"
              variant="text"
              onClick={handleLogout}
              sx={{ color: "MenuText", border: "solid 1px gray" }}
            >
              <Typography variant="body2" component="span">
                Keluar
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ justifyContent: open ? "space-between" : "center", height: 84 }}>
          <Box
            component="img"
            src="/images/logo.png"
            alt="Logo"
            height={48}
            sx={{ display: open ? "block" : "none" }}
          />
          <IconButton onClick={toggleDrawerState}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>

        <Select
          defaultValue={pocket?.name}
          sx={{
            marginLeft: open ? 2 : 0,
            marginRight: open ? 2 : 0,
            width: 'auto',
            borderRadius: 999,
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
            backgroundColor: open ? pocket?.color ?? purple[500] : 'transparent',
            '& .MuiBox-root': {
              color: open ? 'white' : pocket?.color ?? purple[500],
              fontWeight: 'bold',
            },
            '& .MuiBox-root span': {
              display: open ? 'flex' : 'none',
            },
            '& .MuiSvgIcon-root': {
              color: open ? 'white' : 'inherit',
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                paddingX: 2,
                paddingY: 1,
                marginTop: 1,
                gap: 12,
                borderRadius: 2,
              },
            },
          }}
          onChange={(event) => {
            const selectedPocket = pockets.find(p => p.name === event.target?.value);
            setPocket(selectedPocket ?? pockets[0]);
          }}
        >
          {pockets.map((pocket, index) => (
            <MenuItem
              key={pocket.name}
              value={pocket.name}
              disabled={index === 0}
              sx={(theme) => ({
                borderRadius: 999,
                marginY: theme.spacing(0.5),
                transition: 'background-color 0.2s, color 0.2s',
                fontWeight: 'bold',

                '&:hover': {
                  backgroundColor: `${pocket.color} !important`,
                  color: 'white',

                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  },

                  '& span': {
                    color: 'white',
                  },
                },
              })}
            >
              <Box display="flex" alignItems="center" gap={1}>
                {/* <CustomIcon sx={{ color: pocket.color }} name={pocket?.icon ?? 'wallet'} /> */}
                <Icon>
                  money_bag
                </Icon>
                <Box component="span" sx={{ color: pocket.color }}>
                  {pocket.name}
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Select>

        <List sx={{ marginTop: 2 }}>
          {menus.map((menu) => (
            <ListItem key={menu.text} disablePadding sx={{ display: 'block', paddingX: open ? 2 : 0 }}>
              <ListItemButton
                selected={pathname === menu.href}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    borderRadius: 999,
                  },
                  open
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
                    open
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
                  primary={menu.text}
                  onClick={() => router.push(menu.href)}
                  sx={[
                    open
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
      </Drawer>
    </>
  );
}
