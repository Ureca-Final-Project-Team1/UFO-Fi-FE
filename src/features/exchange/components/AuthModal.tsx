'use client';

import { useRouter } from 'next/navigation';

import { Modal } from '@/shared';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export const AuthModal = ({
  isOpen,
  onClose,
  title = '접근 권한 없음',
  description = '본인이 작성한 글만 수정할 수 있습니다.\n다시 확인해 주세요.',
}: AuthModalProps) => {
  const router = useRouter();

  const handleConfirm = () => {
    onClose();
    router.push('/exchange');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      type="single"
      primaryButtonText="거래소로 돌아가기"
      onPrimaryClick={handleConfirm}
      closeOnPrimary={true}
    />
  );
};
