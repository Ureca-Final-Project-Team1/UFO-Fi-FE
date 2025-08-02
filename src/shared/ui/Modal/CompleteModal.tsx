'use client';

import React, { ComponentProps } from 'react';

import { IMAGE_PATHS } from '@/constants/images';

import { Modal } from './Modal';

type CompleteModalProps = ComponentProps<typeof Modal>;

export const CompleteModal: React.FC<CompleteModalProps> = (props) => {
  const {
    title = '완료',
    description = '작업이 완료되었습니다',
    isOpen = false,
    onClose = () => {},
    ...rest
  } = props;

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
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
    />
  );
};
