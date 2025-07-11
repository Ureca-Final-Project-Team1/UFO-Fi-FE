'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/ui';

import { ModalProps } from './Modal.types';
import { modalVariants, modalOverlayVariants, modalHeaderVariants } from './modalVariants';

// 기본값 상수 선언
const DEFAULT_IMAGE_POSITION = { x: -25, y: -10 };
const DEFAULT_IMAGE_SIZE = { width: 100, height: 100 };

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  rounded = 'sm',
  hasCloseButton = false,
  closeButtonPosition = 'top-right',
  headerAlign = 'center',
  imageSrc,
  imageAlt = '',
  imagePosition = DEFAULT_IMAGE_POSITION,
  imageSize = DEFAULT_IMAGE_SIZE,
  type = 'single',
  primaryButtonText = '확인',
  secondaryButtonText = '취소',
  onPrimaryClick,
  onSecondaryClick,
  closeOnPrimary = true,
  closeOnSecondary = true,
  className,
}: ModalProps & {
  closeOnPrimary?: boolean;
  closeOnSecondary?: boolean;
}) {
  const handlePrimaryClick = () => {
    onPrimaryClick?.();
    if (closeOnPrimary) onClose();
  };

  const handleSecondaryClick = () => {
    onSecondaryClick?.();
    if (closeOnSecondary) onClose();
  };

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      modal={true}
    >
      <DialogPrimitive.Overlay className={modalOverlayVariants()} />

      <DialogPrimitive.Content
        className={cn('relative', modalVariants({ size, rounded, hasCloseButton }), className)}
        onInteractOutside={(e) => e.preventDefault()} // 오버레이 클릭 시 닫힘 방지
      >
        {/* 닫기 버튼 */}
        {hasCloseButton && (
          <button
            onClick={onClose}
            className={cn(
              'absolute z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-200',
              'transition-colors duration-200 w-8 h-8 flex items-center justify-center',
              closeButtonPosition === 'top-right' ? 'top-4 right-4' : 'top-4 left-4',
            )}
            aria-label="모달 닫기"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* 이미지 */}
        {imageSrc && (
          <div
            className="absolute z-10 pointer-events-none"
            style={{
              left: `${imagePosition.x}%`,
              top: `${imagePosition.y}%`,
              width: imageSize.width,
              height: imageSize.height,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={imageSize.width}
                height={imageSize.height}
                className="object-contain drop-shadow-lg"
                unoptimized
              />
            </div>
          </div>
        )}

        {/* 텍스트 헤더 */}
        {(title || description) && (
          <div className={cn('mb-6', modalHeaderVariants({ align: headerAlign }))}>
            {title && (
              <DialogPrimitive.Title className="text-[18px] font-bold text-gray-900 mb-3">
                {title}
              </DialogPrimitive.Title>
            )}
            {description && (
              <DialogPrimitive.Description className="text-[14px] text-gray-600 leading-relaxed">
                {description}
              </DialogPrimitive.Description>
            )}
          </div>
        )}

        {/* children 영역 */}
        {children && <div className="mb-6 relative z-20">{children}</div>}

        {/* 버튼 컨테이너 영역 */}
        {type !== 'none' && (
          <div className="flex gap-3 relative z-20">
            {type === 'double' && (
              <Button
                variant="secondary"
                size="default"
                onClick={handleSecondaryClick}
                className="flex-1"
              >
                {secondaryButtonText}
              </Button>
            )}
            <Button
              variant="primary"
              size="default"
              onClick={handlePrimaryClick}
              className={type === 'single' ? 'w-full' : 'flex-1'}
            >
              {primaryButtonText}
            </Button>
          </div>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Root>
  );
}
