'use client';

import { useRouter } from 'next/navigation';

import { IMAGE_PATHS } from '@/constants';
import { Modal } from '@/shared';

export interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  redirectTo?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: { x: number; y: number };
  imageSize?: { width: number; height: number };
  type?: 'single' | 'double';
  hasCloseButton?: boolean;
}

export const LogoutModal = ({
  isOpen,
  onClose,
  title = '로그아웃',
  description = '정말 로그아웃하시겠습니까?',
  primaryButtonText = '확인',
  secondaryButtonText = '취소',
  onPrimaryClick,
  onSecondaryClick,
  redirectTo,
  imageSrc = IMAGE_PATHS['AL_REPORTED'],
  imageAlt = '로그아웃',
  imagePosition = { x: 90, y: 50 },
  imageSize = { width: 150, height: 150 },
  type = 'double',
  hasCloseButton = false,
}: LogoutModalProps) => {
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
      secondaryButtonText={secondaryButtonText}
      onPrimaryClick={handlePrimaryClick}
      onSecondaryClick={onSecondaryClick}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      imagePosition={imagePosition}
      imageSize={imageSize}
      type={type}
      hasCloseButton={hasCloseButton}
      headerAlign="left"
    />
  );
};
