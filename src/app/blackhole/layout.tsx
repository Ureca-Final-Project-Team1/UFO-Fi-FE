import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UFO-Fi | 블랙홀',
  description: 'UFO-Fi 정지된 사용자의 페이지입니다.',
  robots: 'index, follow',
};

export default function BlackholeLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen w-full">{children}</div>;
}
