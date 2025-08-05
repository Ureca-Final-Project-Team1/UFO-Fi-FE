import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'UFO-Fi | 회원가입 시작',
  description: '개인정보 처리방침에 동의하고 회원가입을 시작하세요.',
  robots: 'index, follow',
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
