'use client';

import React from 'react';

import { useModalStore } from '@/stores/useModalStore';

import { Modal } from './Modal';

export function GlobalModal() {
  const { isOpen, closeModal, currentModal, modals } = useModalStore();

  if (!currentModal) return null;

  const activeKey = Object.keys(modals).find((key) => isOpen(key));
  if (!activeKey) return null;

  // 기본값 구조 분해
  const {
    hasCloseButton = false,
    closeButtonPosition = 'top-right',
    title,
    description,
    imageSrc,
    imageAlt,
    imagePosition,
    imageSize,
    type,
    size,
    rounded,
    headerAlign,
    primaryButtonText,
    secondaryButtonText,
    onPrimaryClick,
    onSecondaryClick,
    children,
    ...rest
  } = currentModal;

  return (
    <Modal
      isOpen={isOpen(activeKey)}
      onClose={() => closeModal(activeKey)}
      hasCloseButton={hasCloseButton}
      closeButtonPosition={closeButtonPosition}
      title={title}
      description={description}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      imagePosition={imagePosition}
      imageSize={imageSize}
      type={type}
      size={size}
      rounded={rounded}
      headerAlign={headerAlign}
      primaryButtonText={primaryButtonText}
      secondaryButtonText={secondaryButtonText}
      onPrimaryClick={onPrimaryClick}
      onSecondaryClick={onSecondaryClick}
      {...rest}
    >
      {children}
    </Modal>
  );
}
