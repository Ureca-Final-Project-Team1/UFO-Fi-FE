'use client';

import React from 'react';

import { Modal } from './Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  onPrimaryClick?: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  title = '알림',
  description = '',
  primaryButtonText = '확인',
  onPrimaryClick,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      primaryButtonText={primaryButtonText}
      onPrimaryClick={onPrimaryClick}
      hasCloseButton={false}
      type="single"
    />
  );
};
