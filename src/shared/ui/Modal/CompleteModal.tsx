'use client';

import React from 'react';

import { Modal } from './Modal';

interface CompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompleteModal: React.FC<CompleteModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      headerAlign="left"
      title="신고 접수가 완료되었어요!"
      description={`신고해주신 내용을 외계 요원이\n꼼꼼히 확인하고 조치할 예정입니다.`}
      imageSrc="/images/alien-serious-reported.png"
      imageAlt="신고"
      imagePosition={{ x: 90, y: 50 }}
      imageSize={{ width: 150, height: 150 }}
      type="single"
      closeOnPrimary
      hasCloseButton={false}
    />
  );
};
