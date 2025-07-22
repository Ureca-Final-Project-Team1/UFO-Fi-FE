'use client';

import { useRouter } from 'next/navigation';

import { Modal } from '@/shared';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  onPrimaryClick?: () => void;
  redirectTo?: string;
}

export function ConfirmModal({
  isOpen,
  onClose,
  title = '알림',
  description = '',
  primaryButtonText = '확인',
  onPrimaryClick,
  redirectTo,
}: ConfirmModalProps) {
  const router = useRouter();

  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    }
    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      primaryButtonText={primaryButtonText}
      onPrimaryClick={handlePrimaryClick}
      hasCloseButton={false}
      type="single"
    />
  );
}
