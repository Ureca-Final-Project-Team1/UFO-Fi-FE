import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import {
  skeletonVariants,
  skeletonAnimationVariants,
  skeletonBackgroundVariants,
  skeletonSizeVariants,
  skeletonTextVariants,
  skeletonAvatarVariants,
  skeletonCardVariants,
} from './SkeletonVariants';

// 스켈레톤 요소 타입
export type SkeletonElement = 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

// 애니메이션 variant 타입
export type AnimationVariant = 'pulse' | 'shimmer' | 'none';

// 메인 Skeleton Props
export interface SkeletonProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  as?: SkeletonElement;
  variant?: AnimationVariant;
  size?: VariantProps<typeof skeletonVariants>['size'];
  shape?: VariantProps<typeof skeletonVariants>['shape'];
  color?: VariantProps<typeof skeletonVariants>['color'];
}

// 애니메이션 Props
export interface SkeletonAnimationProps extends VariantProps<typeof skeletonAnimationVariants> {
  className?: string;
}

// 배경 Props
export interface SkeletonBackgroundProps extends VariantProps<typeof skeletonBackgroundVariants> {
  className?: string;
}

// 크기 Props
export interface SkeletonSizeProps extends VariantProps<typeof skeletonSizeVariants> {
  className?: string;
}

// 텍스트 스켈레톤 Props
export interface SkeletonTextProps {
  variant?: VariantProps<typeof skeletonTextVariants>['variant'];
  size?: VariantProps<typeof skeletonTextVariants>['size'];
  lines?: VariantProps<typeof skeletonTextVariants>['lines'];
  className?: string;
}

// 아바타 스켈레톤 Props
export interface SkeletonAvatarProps extends VariantProps<typeof skeletonAvatarVariants> {
  className?: string;
}

// 카드 스켈레톤 Props
export interface SkeletonCardProps extends VariantProps<typeof skeletonCardVariants> {
  className?: string;
  children?: React.ReactNode;
}
