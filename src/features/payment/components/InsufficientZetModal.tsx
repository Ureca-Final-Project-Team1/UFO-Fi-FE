import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { Modal } from '@/shared/ui';

interface InsufficientZetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  onGoToCharge: () => void;
}

export function InsufficientZetModal({
  isOpen,
  onClose,
  onCancel,
  onGoToCharge,
}: InsufficientZetModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="보유 ZET가 부족합니다."
      description="지금 충전하러 갈까요?"
      type="double"
      primaryButtonText="확인"
      secondaryButtonText="취소"
      onPrimaryClick={onGoToCharge}
      onSecondaryClick={onCancel}
      headerAlign="center"
      size="square"
      hasCloseButton={false}
      imageSrc={IMAGE_PATHS.AL_SOWHAT}
      imageAlt="부족한 ZET"
      imagePosition={{ x: 50, y: 50 }}
      imageSize={{ width: 100, height: 100 }}
    />
  );
}
