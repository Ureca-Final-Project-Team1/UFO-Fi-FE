'use client';

import { useMemo } from 'react';

import { useUserInfo } from '@/shared';

type UserRole = 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_NO_INFO' | 'ROLE_REPORTED';

export const useUserRole = (enabled: boolean = true) => {
  const { data, isLoading, error } = useUserInfo(enabled);

  const userRole = useMemo((): UserRole | null => {
    if (!data) return null;
    return data.content.role;
  }, [data]);

  const permissions = useMemo(
    () => ({
      isAdmin: userRole === 'ROLE_ADMIN',
      isUser: userRole === 'ROLE_USER',
      isReported: userRole === 'ROLE_REPORTED',
      needsSignup: userRole === 'ROLE_NO_INFO',
      hasAccess: userRole === 'ROLE_USER' || userRole === 'ROLE_ADMIN',
    }),
    [userRole],
  );

  return {
    userRole,
    permissions,
    phoneNumber: data?.content?.phoneNumber,
    isLoading,
    error,
  };
};
