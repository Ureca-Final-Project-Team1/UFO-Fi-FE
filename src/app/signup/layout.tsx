import type { Metadata } from 'next';
import { ReactNode } from 'react';

import SignupClientLayout from '@/features/signup/components/SignupClientLayout';

export const metadata: Metadata = {
  title: 'UFO-Fi 회원가입',
  description: 'UFO-Fi 회원가입 페이지',
  robots: 'index, follow',
};

export default function SignupLayout({ children }: { children: ReactNode }) {
  return <SignupClientLayout>{children}</SignupClientLayout>;
}
