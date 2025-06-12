'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authStore from '@/features/auth/stores/auth';

export function AuthGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  const { token } = authStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace('/auth');
    }
  }, [token]);

  return <>{children}</>;
}