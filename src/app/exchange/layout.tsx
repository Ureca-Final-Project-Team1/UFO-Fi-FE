import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UFO-Fi 전파 거래소',
  description: 'UFO-Fi 전파 거래소 메인 페이지',
  robots: 'index, follow',
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-full w-full">{children}</div>;
}
