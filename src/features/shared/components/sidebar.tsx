"use client"

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Toolbar,
} from '@mui/material';
import {
  Home,
  Settings,
  Logout,
} from '@mui/icons-material';
import { limeGreen } from '@/lib/custom-color';
import { usePathname } from 'next/navigation';
import Select from './select';

const drawerWidth = 240;

export const Sidebar = () => {
  const pathName = usePathname()
  console.log(pathName)

  const menus = [
    {
      text: 'Home',
      value: "/",
      icon: <Home />
    },
    {
      text: 'Settings',
      value: "settings",
      icon: <Settings />
    },
    {
      text: 'Logout',
      value: "home",
      icon: <Logout />
    },
  ]

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />

      <Box sx={{ overflow: 'auto', display: "flex", flexDirection: "column", padding: 2, marginTop: 4, gap: 2 }}>
        <Select defaultValue='home'>
          <MenuItem value="home" disabled>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListItemIcon sx={{ color: "white" }}><Home /></ListItemIcon>
              <ListItemText primary="Home" />
            </Box>
          </MenuItem>
          <MenuItem value="settings">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListItemIcon><Settings /></ListItemIcon>
              <ListItemText primary="Donat Bahagia" />
            </Box>
          </MenuItem>
        </Select>

        <List>
          {menus.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton selected={item.value === pathName} sx={{
                borderRadius: 99,
                '&.Mui-selected': {
                  backgroundColor: limeGreen[500],
                  color: 'black',
                  '& .MuiListItemIcon-root': {
                    color: 'black',
                  },
                },
              }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
