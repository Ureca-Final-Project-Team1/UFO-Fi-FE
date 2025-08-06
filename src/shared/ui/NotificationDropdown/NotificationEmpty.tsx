import React from 'react';

import { cn } from '@/lib/utils';
import { Icon } from '@/shared';

import { NotificationEmptyProps } from './NotificationDropdown.types';
import {
  notificationEmptyVariants,
  notificationEmptyIconVariants,
  notificationEmptyTitleVariants,
  notificationEmptyDescriptionVariants,
} from './NotificationDropdownVariants';

export const NotificationEmpty: React.FC<NotificationEmptyProps> = ({
  className,
  variant = 'default',
  size = 'md',
  iconSize = 'md',
  iconVariant = 'default',
  titleSize = 'md',
  titleVariant = 'default',
  descriptionSize = 'md',
  descriptionVariant = 'default',
  customIcon,
  customTitle = '알림이 없습니다',
  customDescription = '새로운 알림이 도착하면 여기에 표시됩니다',
}) => {
  return (
    <div className={cn(notificationEmptyVariants({ variant, size }), className)}>
      <div className={cn(notificationEmptyIconVariants({ size: iconSize, variant: iconVariant }))}>
        {customIcon || <Icon name="Bell" className="w-8 h-8 text-gray-400" color="white" />}
      </div>
      <h4
        className={cn(notificationEmptyTitleVariants({ size: titleSize, variant: titleVariant }))}
      >
        {customTitle}
      </h4>
      <p
        className={cn(
          notificationEmptyDescriptionVariants({
            size: descriptionSize,
            variant: descriptionVariant,
          }),
        )}
      >
        {customDescription}
      </p>
    </div>
  );
};
