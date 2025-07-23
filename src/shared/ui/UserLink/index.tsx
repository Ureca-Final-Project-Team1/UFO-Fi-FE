import { useRouter } from 'next/navigation';
import React from 'react';

interface UserLinkProps {
  userId: number;
  nickname: string;
  className?: string;
}

export function UserLink({ userId, nickname, className }: UserLinkProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/profile/${userId}`);
  };

  return (
    <button
      onClick={handleClick}
      className={
        className || 'text-cyan-400 hover:text-cyan-300 cursor-pointer bg-transparent border-none'
      }
    >
      {nickname}
    </button>
  );
}
