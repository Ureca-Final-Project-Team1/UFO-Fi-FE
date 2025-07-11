import { VariantProps } from 'class-variance-authority';

import { titleVariants } from './titleVariants';

export type TitleIconVariant = 'none' | 'back' | 'close';

export interface TitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof titleVariants> {
  title: string;
  iconVariant?: TitleIconVariant;
  onClick?: () => void;
}
