'use client';

import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { Modal } from '@/shared/ui/Modal';

interface ChargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ChargeModal({ isOpen, onClose, onConfirm }: ChargeModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="square"
      rounded="lg"
      imageSrc={IMAGE_PATHS.SOWHAT}
      imageAlt="충전"
      imageSize={{ width: 100, height: 100 }}
      imagePosition={{ x: 0, y: 0 }}
      title="보유 ZET가 부족합니다."
      description="지금 충전하러 갈까요?"
      type="double"
      primaryButtonText="확인"
      secondaryButtonText="취소"
      onPrimaryClick={onConfirm}
      onSecondaryClick={onClose}
    />
  );
}
