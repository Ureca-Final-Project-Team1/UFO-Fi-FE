export type LoadingVariant = 'default' | 'spinner' | 'dots' | 'pulse' | 'signal';
export type LoadingSize = 'sm' | 'md' | 'lg';

export interface LoadingProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
  message?: string;
  className?: string;
  fullScreen?: boolean;
  showMessage?: boolean;
}
