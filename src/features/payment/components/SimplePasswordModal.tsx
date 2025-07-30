import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { Modal } from '@/shared';

type PasswordFailureStatus = 'single' | 'multiple' | 'reset';

interface SimplePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: PasswordFailureStatus;
  failureCount?: number;
}

export function SimplePasswordModal({
  isOpen,
  onClose,
  status,
  failureCount = 1,
}: SimplePasswordModalProps) {
  const getModalContent = () => {
    switch (status) {
      case 'single':
        return {
          title: '간편 비밀번호를\n정확하게 입력해주세요.',
          description: `(${failureCount}회 입력 실패)`,
        };
      case 'multiple':
        return {
          title: '간편 비밀번호를\n정확하게 입력해주세요.',
          description: `(${failureCount}회 입력 실패)\n총 5회 입력 실패 시\n비밀번호 재설정이 진행됩니다.`,
        };
      case 'reset':
        return {
          title: '비밀번호 5회 입력 실패로\n비밀번호 재설정이 필요합니다.',
          description: `'확인'을 누르면\n비밀번호 재설정을 시작합니다.`,
        };
      default:
        return {
          title: '간편 비밀번호를\n정확하게 입력해주세요.',
          description: `(${failureCount}회 입력 실패)`,
        };
    }
  };

  const { title, description } = getModalContent();

  // 텍스트가 긴 경우 square-tall 사이즈 사용
  const modalSize = status === 'multiple' || status === 'reset' ? 'square-tall' : 'square';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      type="single"
      primaryButtonText="확인"
      onPrimaryClick={onClose}
      headerAlign="center"
      size={modalSize}
      hasCloseButton={false}
      imageSrc={IMAGE_PATHS.AL_SOWHAT || '/images/alien-sowhat.png'}
      imageAlt="간편 비밀번호 실패"
      imagePosition={{ x: 50, y: 50 }}
      imageSize={{ width: 100, height: 100 }}
    />
  );
}
