import { createPageMetadata } from '@/utils/metadata';

export const metadata = createPageMetadata({
  title: '로그인',
  description: 'UFO-Fi에 로그인하여 데이터는 부족해도, 은하는 연결되어 있는 경험을 시작하세요.',
  noIndex: true,
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
