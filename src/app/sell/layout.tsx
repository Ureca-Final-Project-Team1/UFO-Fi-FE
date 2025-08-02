import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UFO-Fi 판매등록',
  description: 'UFO-Fi 판매 등록 페이지',
  robots: 'index, follow',
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
