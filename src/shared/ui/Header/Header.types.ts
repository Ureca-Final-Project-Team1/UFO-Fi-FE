import { VariantProps } from 'class-variance-authority';

import {
  headerVariants,
  logoVariants,
  logoIconVariants,
  logoTextVariants,
  userInfoVariants,
  userAvatarVariants,
  userNameVariants,
  actionAreaVariants,
} from './HeaderVariants';

// 메인 Header Props
export interface HeaderProps {
  userName?: string;
  onLogout?: () => void;
  className?: string;
  // Header 컨테이너 variants
  variant?: VariantProps<typeof headerVariants>['variant'];
  size?: VariantProps<typeof headerVariants>['size'];
  // 로고 variants
  logoSize?: VariantProps<typeof logoVariants>['size'];
  logoVariant?: VariantProps<typeof logoVariants>['variant'];
  logoIconSize?: VariantProps<typeof logoIconVariants>['size'];
  logoIconVariant?: VariantProps<typeof logoIconVariants>['variant'];
  logoTextSize?: VariantProps<typeof logoTextVariants>['size'];
  logoTextVariant?: VariantProps<typeof logoTextVariants>['variant'];
  // 사용자 정보 variants
  userInfoDisplay?: VariantProps<typeof userInfoVariants>['display'];
  userInfoPosition?: VariantProps<typeof userInfoVariants>['position'];
  userAvatarSize?: VariantProps<typeof userAvatarVariants>['size'];
  userAvatarVariant?: VariantProps<typeof userAvatarVariants>['variant'];
  userNameSize?: VariantProps<typeof userNameVariants>['size'];
  userNameVariant?: VariantProps<typeof userNameVariants>['variant'];
  // 액션 영역 variants
  actionPosition?: VariantProps<typeof actionAreaVariants>['position'];
  // 커스터마이징 옵션
  showUserInfo?: boolean;
  showLogoutButton?: boolean;
  logoText?: string;
  logoIcon?: React.ReactNode;
  customActions?: React.ReactNode;
}

// 로고 컴포넌트 Props
export interface LogoProps {
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  size?: VariantProps<typeof logoVariants>['size'];
  variant?: VariantProps<typeof logoVariants>['variant'];
  iconSize?: VariantProps<typeof logoIconVariants>['size'];
  iconVariant?: VariantProps<typeof logoIconVariants>['variant'];
  textSize?: VariantProps<typeof logoTextVariants>['size'];
  textVariant?: VariantProps<typeof logoTextVariants>['variant'];
}

// 사용자 정보 컴포넌트 Props
export interface UserInfoProps {
  userName?: string;
  className?: string;
  display?: VariantProps<typeof userInfoVariants>['display'];
  position?: VariantProps<typeof userInfoVariants>['position'];
  avatarSize?: VariantProps<typeof userAvatarVariants>['size'];
  avatarVariant?: VariantProps<typeof userAvatarVariants>['variant'];
  nameSize?: VariantProps<typeof userNameVariants>['size'];
  nameVariant?: VariantProps<typeof userNameVariants>['variant'];
}

// 액션 영역 컴포넌트 Props
export interface ActionAreaProps {
  children?: React.ReactNode;
  className?: string;
  position?: VariantProps<typeof actionAreaVariants>['position'];
}
