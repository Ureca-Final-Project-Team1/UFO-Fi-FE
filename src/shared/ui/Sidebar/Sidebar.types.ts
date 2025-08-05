import { VariantProps } from 'class-variance-authority';

import { IconType } from '../Icons';
import {
  sidebarVariants,
  sidebarNavVariants,
  menuItemContainerVariants,
  menuItemVariants,
  menuItemIconVariants,
  chevronIconVariants,
  submenuContainerVariants,
  submenuItemsContainerVariants,
} from './SidebarVariants';

export interface MenuItem {
  id: string;
  label: string;
  icon: IconType;
  href?: string;
  children?: MenuItem[];
}

export interface SidebarProps extends VariantProps<typeof sidebarVariants> {
  className?: string;
  menuItems?: MenuItem[];
}

export interface SidebarNavProps extends VariantProps<typeof sidebarNavVariants> {
  children: React.ReactNode;
}

export interface MenuItemContainerProps extends VariantProps<typeof menuItemContainerVariants> {
  children: React.ReactNode;
}

export interface MenuItemProps extends VariantProps<typeof menuItemVariants> {
  item: MenuItem;
  isActive: boolean;
  isOpen?: boolean;
  hasChildren?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface MenuItemIconProps extends VariantProps<typeof menuItemIconVariants> {
  icon: IconType;
}

export interface ChevronIconProps extends VariantProps<typeof chevronIconVariants> {
  isOpen: boolean;
}

export interface SubmenuContainerProps extends VariantProps<typeof submenuContainerVariants> {
  children: React.ReactNode;
}

export interface SubmenuItemsContainerProps
  extends VariantProps<typeof submenuItemsContainerVariants> {
  children: React.ReactNode;
}
