import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { useModalStore } from '@/stores/useModalStore';

export function withProtectedRoute<P>(Component: React.ComponentType<P>) {
  return function ProtectedComponent(props: React.PropsWithChildren<P>) {
    const { data: myInfo, isLoading } = useMyInfo();
    const showLoginModal = useModalStore((s) => s.showLoginModal);

    if (isLoading) return null;

    if (!myInfo) {
      showLoginModal();
      return null;
    }

    return <Component {...props} />;
  };
}
