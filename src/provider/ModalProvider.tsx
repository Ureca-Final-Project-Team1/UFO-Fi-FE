'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamic import로 SSR 방지
const GlobalModal = dynamic(
  () => import('@/shared/ui/Modal').then((mod) => ({ default: mod.GlobalModal })),
  {
    ssr: false,
    loading: () => null,
  },
);

export function ModalProvider() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <GlobalModal />;
}
