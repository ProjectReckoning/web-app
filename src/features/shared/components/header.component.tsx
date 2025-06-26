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
import { PocketEntity } from '@/features/pocket/entities/pocket.entites';
import { purple } from '@/lib/custom-color';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { logout } = authStore();
  const { pockets, isLoading, selectPocket } = pocketStore();
  const [selectedPocketId, setSelectedPocketId] = useState<string>('');
  const availablePocketsMenus = getAvailablePocketsMenu(pockets);

  const router = useRouter();
  const pathname = usePathname();

  const menus: DrawerMenuItem[] = selectedPocketId === "global"
    ? [
      { name: 'Beranda', icon: <Icon fontSize={24} icon="eva:home-outline" />, href: `/dashboard/${selectedPocketId}` },
    ] : [
      { name: 'Beranda', icon: <Icon fontSize={24} icon="eva:home-outline" />, href: `/dashboard/${selectedPocketId}` },
      { name: 'Transaksi', icon: <Icon fontSize={24} icon="fontisto:paper-plane" />, href: `/dashboard/${selectedPocketId}/transactions` },
      { name: 'Anggota', icon: <Icon fontSize={24} icon="octicon:people-16" />, href: `/dashboard/${selectedPocketId}/members` },
      { name: 'Pengaturan', icon: <Icon fontSize={24} icon="uil:setting" />, href: `/dashboard/${selectedPocketId}/settings` },
    ]

  useEffect(() => {
    if (availablePocketsMenus.length === 0 || availablePocketsMenus[0].id === '') {
      return;
    }

    const pocketIdFromUrl = pathname.split('/')[2];
    const foundPocket = availablePocketsMenus.find(p => p.id === pocketIdFromUrl);

    if (foundPocket) {
      if (foundPocket.id !== selectedPocketId) {
        setSelectedPocketId(foundPocket.id);
        selectPocket(foundPocket.id);
      }
    } else {
      const fallbackId = availablePocketsMenus[0]?.id ?? '';

      if (!fallbackId) {
        router.push('/not-found');
      }

      if (fallbackId !== selectedPocketId) {
        setSelectedPocketId(fallbackId);
        selectPocket(fallbackId);
      }
    }
  }, [pathname, availablePocketsMenus.length]);

  useEffect(() => {
    if (selectedPocketId === '') {
      return;
    }

    switch (selectedPocketId) {
      case '':
        router.push('/dashboard');
        break;
      case 'global':
        router.push('/dashboard/global');
        break;
      default:
        router.push(`/dashboard/${selectedPocketId}/${pathname.split('/').slice(3).join('/') ?? ''}`);
        break;
    }
  }, [selectedPocketId, router]);

  const handlePocketChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedPocketId(value);
    selectPocket(value);
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
        isLoading={isLoading}
        selectedPocketId={selectedPocketId}
        pockets={availablePocketsMenus}
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
        onNavigate={(href: string) => router.push(href)}
      />
    </>
  );
}

function getAvailablePocketsMenu(pockets: PocketEntity[]): PocketMenuItem[] {
  const isAdminOrOwner = pockets.some((p) => p.userRole === 'admin' || p.userRole === 'owner');

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
      icon: "pocket",
      color: purple[500],
    });
  }

  if (pocketMenu.length === 0) {
    pocketMenu.push({
      id: '',
      name: '',
      icon: "error",
      color: purple[500],
    });
  }

  return pocketMenu;
}