import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UFO-Fi 온보딩',
  description: 'UFO-Fi 서비스 소개를 위한 온보딩 페이지',
  robots: 'noindex, nofollow',
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
