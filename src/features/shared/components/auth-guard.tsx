'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authStore from '@/features/auth/stores/auth';

export function AuthGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  // TODO: should use token rather than sessionId
  const { sessionId } = authStore();
  const router = useRouter();

  useEffect(() => {
    if (!sessionId) {
      router.replace('/auth');
    }
  }, [sessionId]);

  return <>{children}</>;
}