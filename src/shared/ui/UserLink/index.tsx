'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface UserLinkProps {
  userId: number | string | null | undefined;
  nickname: string | null | undefined;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
}

export function UserLink({
  userId,
  nickname,
  className = '',
  onClick,
  disabled = false,
}: UserLinkProps) {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // 커스텀 onClick이 있으면 먼저 실행
    if (onClick) {
      onClick(event);
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
    return <span className={`text-gray-400 ${className}`}>{nickname || '알 수 없는 사용자'}</span>;
  }

  const defaultClassName =
    'text-cyan-400 hover:text-cyan-300 cursor-pointer bg-transparent border-none underline-offset-4 hover:underline transition-colors';
  const disabledClassName = 'text-gray-400 cursor-not-allowed';

  const finalClassName = disabled
    ? `${disabledClassName} ${className}`
    : `${defaultClassName} ${className}`;

  return (
    <button onClick={handleClick} className={finalClassName} disabled={disabled} type="button">
      {nickname}
    </button>
  );
}
