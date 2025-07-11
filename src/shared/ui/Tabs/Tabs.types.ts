import * as TabsPrimitive from '@radix-ui/react-tabs';

import { TabsTriggerVariantProps } from './tabsVariants';

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> & {
  children: React.ReactNode;
};

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & {
  children: React.ReactNode;
};

export type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> &
  TabsTriggerVariantProps & {
    children: React.ReactNode;
  };

export type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content> & {
  children: React.ReactNode;
};
