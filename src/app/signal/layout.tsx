import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UFO-Fi | 전파 거리',
  description: 'UFO-Fi의 전파 거리 탐색 페이지',
  robots: 'index, follow',
};

export default function SignalLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
