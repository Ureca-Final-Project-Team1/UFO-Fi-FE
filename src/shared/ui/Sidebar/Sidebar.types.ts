import type { VariantProps } from 'class-variance-authority';

import type { IconType } from '../Icons';
import {
  sidebarVariants,
  sidebarNavigationVariants,
  sidebarMenuItemVariants,
  sidebarMenuItemActiveVariants,
  sidebarMenuItemInactiveVariants,
  sidebarIconVariants,
  sidebarSubmenuVariants,
  sidebarSubmenuItemsVariants,
  sidebarChevronVariants,
} from './SidebarVariants';

// 메뉴 아이템 인터페이스
export interface MenuItem {
  id: string;
  label: string;
  icon: IconType;
  href?: string;
  children?: MenuItem[];
}

// 메인 Sidebar Props
export interface SidebarProps extends VariantProps<typeof sidebarVariants> {
  className?: string;
  menuItems?: MenuItem[];
  onMenuItemClick?: (item: MenuItem) => void;
  padding?: VariantProps<typeof sidebarNavigationVariants>['padding'];
  spacing?: VariantProps<typeof sidebarNavigationVariants>['spacing'];
}

// 네비게이션 컨테이너 Props
export interface SidebarNavigationProps extends VariantProps<typeof sidebarNavigationVariants> {
  children: React.ReactNode;
  className?: string;
}

// 메뉴 아이템 Props
export interface SidebarMenuItemProps {
  item: MenuItem;
  isActive: boolean;
  level?: number;
  onClick?: () => void;
  className?: string;
  variant?: VariantProps<typeof sidebarMenuItemVariants>['variant'];
  size?: VariantProps<typeof sidebarMenuItemVariants>['size'];
  levelVariant?: VariantProps<typeof sidebarMenuItemVariants>['level'];
  activeVariant?: VariantProps<typeof sidebarMenuItemActiveVariants>['activeVariant'];
  inactiveVariant?: VariantProps<typeof sidebarMenuItemInactiveVariants>['inactiveVariant'];
}

// 메뉴 아이콘 Props
export interface SidebarIconProps extends VariantProps<typeof sidebarIconVariants> {
  icon: IconType;
  isActive: boolean;
  className?: string;
}

// 하위 메뉴 Props
export interface SidebarSubmenuProps extends VariantProps<typeof sidebarSubmenuVariants> {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

// 하위 메뉴 아이템 컨테이너 Props
export interface SidebarSubmenuItemsProps extends VariantProps<typeof sidebarSubmenuItemsVariants> {
  children: React.ReactNode;
  className?: string;
}

// 화살표 아이콘 Props
export interface SidebarChevronProps extends VariantProps<typeof sidebarChevronVariants> {
  isOpen: boolean;
  isActive: boolean;
  className?: string;
}
