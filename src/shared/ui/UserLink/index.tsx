'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface UserLinkProps {
  userId: number | string | null | undefined;
  nickname: string | null | undefined;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  asButton?: boolean;
}

export function UserLink({
  userId,
  nickname,
  className = '',
  onClick,
  disabled = false,
  children,
  asButton = false,
}: UserLinkProps) {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // 커스텀 onClick이 있으면 먼저 실행
    if (onClick && event.type === 'click') {
      onClick(event as React.MouseEvent<HTMLElement>);
    }

    // userId가 유효하지 않거나 disabled 상태면 이동하지 않음
    if (disabled || !userId || !nickname) {
      return;
    }

    const numericUserId = typeof userId === 'string' ? parseInt(userId, 10) : userId;

    if (isNaN(numericUserId) || numericUserId <= 0) {
      console.warn('Invalid userId for UserLink:', userId);
      return;
    }

    router.push(`/profile/${numericUserId}`);
  };

  if (!userId || !nickname) {
    return (
      <span className={`text-gray-400 ${className}`}>
        {children || nickname || '알 수 없는 사용자'}
      </span>
    );
  }

  const defaultClassName = 'cursor-pointer transition-all duration-200 hover:opacity-80';
  const disabledClassName = 'text-gray-400 cursor-not-allowed';

  const finalClassName = disabled
    ? `${disabledClassName} ${className}`
    : `${defaultClassName} ${className}`;

  // children이 있으면 클릭 가능한 div로 래핑
  if (children) {
    return (
      <div
        onClick={handleClick}
        className={finalClassName}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e);
          }
        }}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        {children}
      </div>
    );
  }

  if (asButton) {
    return (
      <button onClick={handleClick} className={finalClassName} disabled={disabled} type="button">
        {nickname}
      </button>
    );
  }

  return (
    <span
      onClick={handleClick}
      className={`${finalClassName} text-cyan-400 hover:text-cyan-300 hover:underline underline-offset-4`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      }}
    >
      {nickname}
    </span>
  );
}
