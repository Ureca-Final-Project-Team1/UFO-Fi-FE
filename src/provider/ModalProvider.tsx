'use client';

import dynamic from 'next/dynamic';

const GlobalModal = dynamic(
  () => import('@/components/ui/Modal').then((mod) => ({ default: mod.GlobalModal })),
  {
    ssr: false,
    loading: () => null,
  },
);

export function ModalProvider() {
  return <GlobalModal />;
}
