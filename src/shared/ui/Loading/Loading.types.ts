export interface LoadingProps {
  variant?: 'default' | 'spinner' | 'dots' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
  fullScreen?: boolean;
  showMessage?: boolean;
}

export type LoadingVariant = LoadingProps['variant'];
export type LoadingSize = LoadingProps['size'];
