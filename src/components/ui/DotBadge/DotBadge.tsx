import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils'; // 이건 shadcn 프로젝트 기본 유틸

import { dotBadgeVariants } from './dotBadgeVariants';

type DotBadgeProps = VariantProps<typeof dotBadgeVariants> & {
  className?: string;
};

export function DotBadge({ color = 'green', size = 'default', className }: DotBadgeProps) {
  return <span className={cn(dotBadgeVariants({ color, size }), className)} />;
}
export default DotBadge;
