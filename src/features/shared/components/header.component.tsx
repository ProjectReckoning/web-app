'use client';

import React, { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

import authStore from '@/features/auth/stores/auth.store';
import pocketStore from '@/features/pocket/stores/pocket.store';
import { usePathname, useRouter } from 'next/navigation';
import Appbar from './app-bar.component';
import Drawer, { DrawerMenuItem } from './drawer';
import { Icon } from '@iconify/react';
import { PocketMenuItem } from '../entities/pocket-menu-item';
import { Pocket } from '@/features/pocket/entities/pocket.entites';
import { purple } from '@/lib/custom-color';

const menus: DrawerMenuItem[] = [
  { name: 'Beranda', icon: <Icon fontSize={24} icon="material-symbols:home-outline-rounded" />, href: '/dashboard' },
  { name: 'Transaksi', icon: <Icon fontSize={24} icon="mdi:send" />, href: '/dashboard/global' },
  { name: 'Anggota', icon: <Icon fontSize={24} icon="mdi:people" />, href: '#' },
  { name: 'Pengaturan', icon: <Icon fontSize={24} icon="mdi:settings" />, href: '#' },
];

function getAvailablePocketsMenu(pockets: Pocket[]): PocketMenuItem[] {
  const isAdminOrOwner = pockets.some((p) => p.user_role === 'admin' || p.user_role === 'owner');

  const pocketMenu = pockets.map((pocket) => ({
    id: pocket.id,
    name: pocket.name,
    icon: pocket.icon,
    color: pocket.color,
  }));

  if (isAdminOrOwner) {
    pocketMenu.unshift({
      id: 'global',
      name: 'Semua Pocket',
      icon: "money_bag",
      color: purple[500],
    });
  }

  if (pocketMenu.length === 0) {
    pocketMenu.push({
      id: '',
      name: 'Pilih Pocket',
      icon: "money_bag",
      color: purple[500],
    });
  }

  return pocketMenu;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { logout } = authStore();
  const { pockets, getAllPockets, selectPocket } = pocketStore();
  const [selectedPocketId, setSelectedPocketId] = useState<string>('');
  const availablePocketsMenus = getAvailablePocketsMenu(pockets);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchAndSetPockets = async () => {
      await getAllPockets();
    };

    if (availablePocketsMenus.length === 0 || availablePocketsMenus[0].id === '') {
      fetchAndSetPockets();
    }
  }, [getAllPockets, availablePocketsMenus.length]);

  useEffect(() => {
    const pocketIdFromUrl = pathname.split('/')[2];
    const foundPocket = availablePocketsMenus.find(p => p.id === pocketIdFromUrl);

    if (foundPocket) {
      if (foundPocket.id !== selectedPocketId) {
        setSelectedPocketId(foundPocket.id);
        selectPocket(foundPocket.id);
      }
    } else {
      const fallbackId = pockets[0]?.id ?? '';
      if (fallbackId !== selectedPocketId) {
        setSelectedPocketId(fallbackId);
        selectPocket(fallbackId);
      }
    }
  }, [pathname, pockets, availablePocketsMenus.length]);

  const handlePocketChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedPocketId(value);
    selectPocket(value);

    switch (value) {
      case '':
        router.replace('/dashboard');
        break;
      case 'global':
        router.replace('/dashboard/global');
        break;
      default:
        router.replace(`/dashboard/${value}`);
        break;
    }
  };

  const toggleDrawerState = () => {
    setOpen((value) => !value);
  };

  const handleLogout = () => {
    logout();
    router.replace('/auth');
  };

  return (
    <>
      <Appbar
        isOpen={open}
        selectedPocketId={selectedPocketId}
        pockets={pockets}
        onLogout={handleLogout}
      />
      <Drawer
        isOpen={open}
        onToggleDrawer={toggleDrawerState}
        pockets={availablePocketsMenus}
        selectedPocketId={selectedPocketId}
        onPocketChange={handlePocketChange}
        menus={menus}
        pathname={pathname}
        onNavigate={router.push}
      />
    </>
  );
}