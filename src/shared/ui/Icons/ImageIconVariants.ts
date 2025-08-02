import { cva } from 'class-variance-authority';

// fallback 컨테이너 variants
export const fallbackVariants = cva('', {
  variants: {
    variant: {
      default: 'flex items-center justify-center bg-gray-100 rounded text-gray-400',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// fallback 아이콘 variants
export const fallbackIconVariants = cva('', {
  variants: {
    variant: {
      default: 'text-gray-400',
      loading: 'text-gray-400 animate-spin',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// span 컨테이너 variants
export const spanVariants = cva('', {
  variants: {
    variant: {
      base: 'inline-flex items-center justify-center shrink-0',
      withRelative: 'inline-flex items-center justify-center shrink-0 relative',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

// 이미지 variants
export const imageVariants = cva('', {
  variants: {
    variant: {
      base: 'object-contain transition-opacity duration-200',
      loading: 'object-contain transition-opacity duration-200 opacity-0',
      loaded: 'object-contain transition-opacity duration-200 opacity-100',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

// 에러 메시지 맵
export const errorMessages = {
  invalidSrc: (src: string) => `Invalid src prop provided to ImageIcon: "${src}"`,
  loadFailed: (src: string) => `ImageIcon failed to load: ${src}`,
} as const;
