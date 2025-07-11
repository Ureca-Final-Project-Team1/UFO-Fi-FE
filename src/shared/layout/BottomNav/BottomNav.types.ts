import { IconType } from '@/shared/ui';

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
