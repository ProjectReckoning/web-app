'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import authStore from '@/features/auth/stores/auth.store';

export function AuthGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  const { token } = authStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (token === undefined || token === null || token === '') {
      router.replace('/auth');
      return;
    }

    if (pathname === '/auth' && token) {
      router.replace('/dashboard');
      return;
    }

    if (pathname === '/' && token) {
      router.replace('/dashboard');
      return;
    }
  }, [pathname, token, router]);

  return <>{children}</>;
}