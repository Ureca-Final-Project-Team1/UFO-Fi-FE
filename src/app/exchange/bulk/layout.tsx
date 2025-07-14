import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UFO-Fi | 일괄구매',
  description: 'UFO-Fi 전파 거래소 일괄구매 페이지',
  robots: 'index, follow',
};

export default function BulkPurchaseLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-full w-full">{children}</div>;
}
