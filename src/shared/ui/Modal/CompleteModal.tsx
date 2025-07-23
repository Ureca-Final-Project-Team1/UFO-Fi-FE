'use client';

import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';

import { Modal } from './Modal';

interface CompleteModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CompleteModal: React.FC<CompleteModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      headerAlign="left"
      title={title}
      description={description}
      imageSrc={IMAGE_PATHS['AL_COMPLETE']}
      imageAlt="신고"
      imagePosition={{ x: 90, y: 50 }}
      imageSize={{ width: 150, height: 150 }}
      type="single"
      closeOnPrimary
      hasCloseButton={false}
    />
  );
};
