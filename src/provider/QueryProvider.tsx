'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import queryClient from '@/lib/queryClient';

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // SSR 환경에서 hydration 불일치 방지
  const [client] = useState(() => queryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
