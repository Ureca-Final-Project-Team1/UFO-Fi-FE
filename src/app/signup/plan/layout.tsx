import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'UFO-Fi | 요금제 선택',
  description: '사용 중인 통신사와 요금제를 선택하고 데이터를 거래하세요.',
  robots: 'index, follow',
};

export default function PlanLayout({ children }: { children: ReactNode }) {
  return <div className="contents">{children}</div>;
}
