import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { Modal } from '@/shared/ui';

interface PaymentCancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function PaymentCancellationModal({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
}: PaymentCancellationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="이 화면을 나가면,"
      description="자산 연결이 취소됩니다."
      type="double"
      primaryButtonText="확인"
      secondaryButtonText="취소"
      onPrimaryClick={onConfirm}
      onSecondaryClick={onCancel}
      headerAlign="center"
      size="square"
      hasCloseButton={false}
      imageSrc={IMAGE_PATHS.AL_SOWHAT}
      imageAlt="자산 연결 취소"
      imagePosition={{ x: 60, y: 60 }}
      imageSize={{ width: 120, height: 120 }}
    />
  );
}
