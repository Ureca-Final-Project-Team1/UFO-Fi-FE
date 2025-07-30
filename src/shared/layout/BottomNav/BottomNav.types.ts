import { IconType } from '@/shared';

export interface NavItem {
  id: string;
  label: string;
  icon: IconType;
  isHighlighted?: boolean;
}

export interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}
