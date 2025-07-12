'use client';

import { ModalProvider, QueryProvider } from '@/provider';
import BackgroundProvider from '@/provider/BackgroundProvider';
import NavigationProvider from '@/provider/NavigationProvider';
import OnboardingGuardProvider from '@/provider/OnboardingGuardProvider';
import { useScrollBlocker } from '@/shared/hooks/useScrollBlocker';

interface ClientLayoutProps {
  children: React.ReactNode;
  className: string;
}

export default function ClientLayout({ children, className }: ClientLayoutProps) {
  useScrollBlocker();

  return (
    <body className={className}>
      <QueryProvider>
        <NavigationProvider>
          <BackgroundProvider>
            <OnboardingGuardProvider>{children}</OnboardingGuardProvider>
          </BackgroundProvider>
        </NavigationProvider>
        <ModalProvider />
      </QueryProvider>
    </body>
  );
}
