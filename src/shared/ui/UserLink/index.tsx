'use client';

import Link from 'next/link';
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
  const numericUserId = typeof userId === 'string' ? parseInt(userId, 10) : userId;
  const isValidUser =
    !disabled && userId && nickname && !isNaN(Number(numericUserId)) && Number(numericUserId) > 0;
  const href = isValidUser ? `/profile/${numericUserId}` : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    // 커스텀 onClick이 있으면 먼저 실행
    if (onClick && event.type === 'click') {
      event.preventDefault();
      event.stopPropagation();
      onClick(event as React.MouseEvent<HTMLElement>);
    }

    if (!isValidUser) return;
  };

  if (!userId || !nickname || !isValidUser) {
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
      <Link href={href || '#'}>
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
      </Link>
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
    <Link href={href || '#'}>
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
    </Link>
  );
}
