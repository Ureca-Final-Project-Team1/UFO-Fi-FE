'use client';

import { useState, useCallback } from 'react';

import { Icon } from '@/shared';

import NumberButton from './NumberButton';
import PasswordInput from './PasswordInput';
import { PasswordPadProps } from '../types';

const NUMBER_PAD = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default function PasswordPad({
  onComplete,
  onDelete,
  onClear,
  maxLength = 6,
  title = '결제 비밀번호',
  subtitle = '비밀번호를 입력해주세요',
  disabled = false,
}: PasswordPadProps) {
  const [password, setPassword] = useState('');

  const handleNumberClick = useCallback(
    (number: number) => {
      if (disabled || password.length >= maxLength) return;
      const newPassword = password + number.toString();
      setPassword(newPassword);
      if (newPassword.length === maxLength) {
        onComplete(newPassword);
      }
    },
    [password, maxLength, onComplete, disabled],
  );

  const handleDelete = useCallback(() => {
    if (disabled) return;
    const newPassword = password.slice(0, -1);
    setPassword(newPassword);
    onDelete();
  }, [password, onDelete, disabled]);

  const handleClear = useCallback(() => {
    if (disabled) return;
    setPassword('');
    onClear();
  }, [onClear, disabled]);

  return (
    <div
      className="flex flex-col items-center w-full max-w-md mx-auto rounded-2xl"
      aria-label="비밀번호 입력 패드"
    >
      {/* 헤더 */}
      <div className="mb-5 text-center">
        <h2 className="text-white text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>

      {/* 상태 메시지 */}
      <div className="text-center mb-2">
        <p className="text-gray-500 text-xs" aria-live="polite">
          {password.length}/{maxLength}
        </p>
      </div>

      {/* 비밀번호 입력 표시 */}
      <div className="mb-8">
        <PasswordInput
          value={password}
          maxLength={maxLength}
          showDots
          aria-label="비밀번호 입력란"
        />
      </div>

      {/* 숫자 키패드 */}
      <div className="grid grid-cols-3 gap-5 mb-6 mt-5">
        {NUMBER_PAD.slice(0, 9).map((number) => (
          <NumberButton
            key={number}
            number={number}
            onClick={handleNumberClick}
            disabled={disabled}
            aria-label={`${number} 입력`}
          />
        ))}
      </div>

      {/* 하단 행: 전체삭제, 0, 하나삭제 */}
      <div className="grid grid-cols-3 gap-5">
        {/* 전체삭제 */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="w-16 h-16 rounded-full text-white text-sm font-bold flex items-center justify-center"
            aria-label="전체 삭제"
          >
            전체삭제
          </button>
        </div>

        {/* 0 */}
        <NumberButton
          number={0}
          onClick={handleNumberClick}
          disabled={disabled}
          aria-label="0 입력"
        />

        {/* ← 삭제 */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleDelete}
            disabled={disabled || password.length === 0}
            className="w-16 h-16 rounded-full flex items-center justify-center"
            aria-label="한 글자 삭제"
          >
            <Icon name="ChevronLeft" size={24} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
