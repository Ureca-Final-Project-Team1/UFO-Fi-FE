import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UFO-Fi | 팔로우 목록',
  description: '팔로우 목록',
  robots: 'noindex, nofollow',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
