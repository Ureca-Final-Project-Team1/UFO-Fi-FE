import type { Metadata } from 'next';

import { EditProvider } from '@/features/exchange/components/EditProvider';

export const metadata: Metadata = {
  title: 'UFO-Fi | 게시글 수정',
  description: 'UFO-Fi 전파 거래소 게시글 수정 페이지',
  robots: 'index, follow',
};

export default function EditLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full">
      <EditProvider>{children}</EditProvider>
    </div>
  );
}
