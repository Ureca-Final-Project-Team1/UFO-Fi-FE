import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보 처리방침',
  description: '개인정보 처리방침 페이지',
  robots: 'index, follow',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
