import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UFO-Fi | 결제',
  description: 'UFO-Fi 결제',
  robots: 'noindex, nofollow',
};

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full min-h-full">{children}</div>;
}
