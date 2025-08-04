import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'UFO-Fi | 회원정보 입력',
  description: '이름과 전화번호를 입력해 회원가입을 진행하세요.',
  robots: 'index, follow',
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <div className="contents">{children}</div>;
}
