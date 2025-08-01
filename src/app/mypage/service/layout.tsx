import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용 약관',
  description: '이용 약관 페이지',
  robots: 'index, follow',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="">{children}</div>;
}
