'use client';

import React, { ComponentProps } from 'react';

import { IMAGE_PATHS } from '@/constants/images';

import { Modal } from './Modal';

type CompleteModalProps = ComponentProps<typeof Modal> & {
  title?: string;
  description?: string;
  isOpen?: boolean;
  onClose?: () => void;
};

export const CompleteModal: React.FC<CompleteModalProps> = (props) => {
  return (
    <Modal
      headerAlign="left"
      imageSrc={IMAGE_PATHS['AL_COMPLETE']}
      imageAlt="신고"
      imagePosition={{ x: 90, y: 50 }}
      imageSize={{ width: 150, height: 150 }}
      type="single"
      closeOnPrimary
      hasCloseButton={false}
      {...props}
    />
  );
};
