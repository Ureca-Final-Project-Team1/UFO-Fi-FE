import React, { ComponentProps } from 'react';

import { DotBadge, Icon } from '@/shared';

import { buttonStyle, iconStyle, badgeStyle, ariaLabelMap } from './NotificationTrigger.styles';

type NotificationTriggerProps = ComponentProps<'button'> & {
  unreadCount?: number;
  onClick?: () => void;
};

export const NotificationTrigger: React.FC<NotificationTriggerProps> = (props) => {
  const { unreadCount = 0, onClick = () => {}, className = '', ...rest } = props;

  // aria-label 동적 생성
  const ariaLabel = unreadCount > 0 ? ariaLabelMap.withCount(unreadCount) : ariaLabelMap.base;

  return (
    <button
      className={`${buttonStyle.base} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      {...rest}
    >
      <Icon name="Bell" className={iconStyle.bell} color="white" />

      {/* 읽지 않은 알림이 있을 때만 표시 */}
      {unreadCount > 0 && (
        <div className={badgeStyle.container}>
          <DotBadge color="red" size="default" className={badgeStyle.badge} />
        </div>
      )}
    </button>
  );
};
