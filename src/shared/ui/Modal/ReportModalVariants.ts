import { cva } from 'class-variance-authority';

import { IMAGE_PATHS } from '@/constants/images';

// 모달 설정
export const modalConfig = {
  headerAlign: 'left' as const,
  title: '게시글을 신고하시겠습니까?',
  description: '신고 사유를 선택해주세요.',
  imageSrc: IMAGE_PATHS['AL_REPORTED'],
  imageAlt: '신고',
  imagePosition: { x: 90, y: 50 },
  imageSize: { width: 150, height: 150 },
  type: 'double' as const,
  hasCloseButton: false,
  color: 'black' as const,
} as const;

// 입력 필드 variants
export const inputVariants = cva('', {
  variants: {
    variant: {
      default: 'w-full border p-2 mt-2 rounded bg-white caption-14-regular',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 입력 필드 설정
export const inputConfig = {
  placeholder: '신고 사유를 입력해주세요.',
} as const;

// 완료 모달 설정
export const completeModalConfig = {
  success: {
    title: '신고 접수가 완료되었어요!',
    description: '신고해주신 내용을 외계 요원이\n꼼꼼히 확인하고 조치할 예정입니다.',
  },
  error: {
    title: (error: string | null) => error ?? '에러가 발생했습니다.',
    description: '잠시 후 다시\n이용해주시길 바랍니다.',
  },
} as const;

// 에러 메시지 맵
export const errorMessages = {
  default: '신고 요청에 실패했습니다.',
  unknown: '알 수 없는 오류가 발생했습니다.',
} as const;
