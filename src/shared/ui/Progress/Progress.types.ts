import * as ProgressPrimitive from '@radix-ui/react-progress';

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export interface ProgressProps {
  /** 사용된 용량 (GB) */
  usedStorage: number;
  /** 전체 용량 (GB) */
  totalStorage: number;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 현재 사용 용량 표시 여부 */
  showCurrentUsage?: boolean;
  /** 최소/최대 용량 표시 여부 */
  showMinMaxLabels?: boolean;
  /** 프로그레스 바 크기 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}
