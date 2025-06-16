'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import authStore from '@/features/auth/stores/auth.store';

export function AuthGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  // TODO: should use token rather than sessionId
  const { sessionId } = authStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (sessionId === undefined || sessionId === '') {
      router.replace('/auth');
    }

    if (pathname === '/auth' && sessionId) {
        router.replace('/dashboard');
    }

    if (pathname === '/' && sessionId) {
      router.replace('/dashboard');
    }
  }, [pathname, sessionId, router]);

  return <>{children}</>;
}