'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useUserRole } from '@/features/signup/hooks/useUserRole';
import { useSignupStore } from '@/stores/useSignupStore';

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isProfileComplete } = useSignupStore();
  const { userRole, isLoading } = useUserRole();

  useEffect(() => {
    if (pathname === '/signup/plan' && !isProfileComplete()) {
      router.replace('/signup/profile');
    }
  }, [pathname, isProfileComplete, router]);

  useEffect(() => {
    if (!isLoading && userRole === 'ROLE_USER') {
      router.replace('/');
    }
  }, [userRole, isLoading, router]);

  return <>{children}</>;
}
