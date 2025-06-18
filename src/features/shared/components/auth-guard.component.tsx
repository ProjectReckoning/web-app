'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import authStore from '@/features/auth/stores/auth.store';

export function AuthGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  const { token } = authStore();
  const router = useRouter();
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Simulate identity checking
  // TODO: Replace with actual identity check logic
  useEffect(() => {
    authStore.setState({ isLoading: true });

    const timeout = setTimeout(() => {
      authStore.setState({ isLoading: false });
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

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