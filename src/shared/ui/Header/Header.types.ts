import { VariantProps } from 'class-variance-authority';

import {
  headerVariants,
  logoVariants,
  titleVariants,
  userAvatarVariants,
  userNameVariants,
} from './HeaderVariants';

export interface HeaderProps extends VariantProps<typeof headerVariants> {
  userName?: string;
  onLogout?: () => void;
  className?: string;
}

export interface LogoProps extends VariantProps<typeof logoVariants> {
  children?: React.ReactNode;
  className?: string;
}

export interface TitleProps extends VariantProps<typeof titleVariants> {
  children: React.ReactNode;
  className?: string;
}

export interface UserAvatarProps extends VariantProps<typeof userAvatarVariants> {
  userName: string;
  className?: string;
}

export interface UserNameProps extends VariantProps<typeof userNameVariants> {
  userName: string;
  className?: string;
}
