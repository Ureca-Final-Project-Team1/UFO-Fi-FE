import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UFO-Fi | ZET 코인 충전소',
  description: 'UFO-Fi의 ZET 코인을 충전할 수 있는 페이지입니다.',
  robots: 'index, follow',
};

export default function ChargeLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-full w-full">{children}</div>;
}
