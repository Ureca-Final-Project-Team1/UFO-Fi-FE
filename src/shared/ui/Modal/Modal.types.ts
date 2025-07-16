import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { modalVariants, modalHeaderVariants } from './modalVariants';

export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'square' | 'square-tall';

  // 헤더 정렬
  headerAlign?: VariantProps<typeof modalHeaderVariants>['align'];

  // 닫기 버튼
  hasCloseButton?: boolean;
  closeButtonPosition?: 'top-right' | 'top-left';

  // 이미지 위치
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: {
    x: number; // -100 ~ 100 (%)
    y: number; // -100 ~ 100 (%)
  };
  imageSize?: {
    width: number;
    height: number;
  };

  // 버튼
  type?: 'single' | 'double' | 'none';
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryButtonDisabled?: boolean;

  className?: string;
}
