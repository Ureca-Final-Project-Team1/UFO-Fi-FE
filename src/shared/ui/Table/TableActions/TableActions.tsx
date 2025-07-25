import { CircleMinusIcon } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import { ReturnIcon } from '../../Icons/CustomIcons';
import { BaseTableRow, TableActionsProps } from '../Table.types';

export function TableActions<T extends BaseTableRow>({
  row,
  actions,
  isLoading = false,
  size = 'md',
}: TableActionsProps<T>) {
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const buttonSize = size === 'sm' ? 'p-1' : 'p-1.5';

  return (
    <div className={cn('flex items-center justify-center', size === 'sm' ? 'gap-1' : 'gap-2')}>
      {actions.edit && (
        <button
          type="button"
          aria-label="수정"
          title={actions.edit.tooltip || '수정'}
          className={cn(
            buttonSize,
            'rounded-full hover:bg-blue-100 transition-colors text-blue-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
          onClick={() => actions.edit!.onClick(row)}
          disabled={isLoading || actions.edit.disabled?.(row)}
        >
          {actions.edit.icon || <ReturnIcon className={iconSize} />}
        </button>
      )}

      {actions.activate && (
        <button
          type="button"
          aria-label="활성화"
          title={actions.activate.tooltip || '활성화'}
          className={cn(
            buttonSize,
            'rounded-full hover:bg-green-100 transition-colors text-green-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
          onClick={() => actions.activate!.onClick(row)}
          disabled={isLoading || actions.activate.disabled?.(row)}
        >
          {actions.activate.icon || <ReturnIcon className={iconSize} />}
        </button>
      )}

      {actions.deactivate && (
        <button
          type="button"
          aria-label="비활성화"
          title={actions.deactivate.tooltip || '비활성화'}
          className={cn(
            buttonSize,
            'rounded-full hover:bg-red-100 transition-colors text-red-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
          onClick={() => actions.deactivate!.onClick(row)}
          disabled={isLoading || actions.deactivate.disabled?.(row)}
        >
          {actions.deactivate.icon || <CircleMinusIcon className={iconSize} />}
        </button>
      )}

      {actions.delete && (
        <button
          type="button"
          aria-label="삭제"
          title={actions.delete.tooltip || '삭제'}
          className={cn(
            buttonSize,
            'rounded-full hover:bg-red-100 transition-colors text-red-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
          onClick={() => actions.delete!.onClick(row)}
          disabled={isLoading || actions.delete.disabled?.(row)}
        >
          {actions.delete.icon || <CircleMinusIcon className={iconSize} />}
        </button>
      )}

      {actions.custom?.map((action, index) => (
        <button
          key={index}
          type="button"
          title={action.tooltip}
          className={cn(
            buttonSize,
            'rounded-full transition-colors',
            {
              'hover:bg-blue-100 text-blue-500': action.variant === 'primary',
              'hover:bg-gray-100 text-gray-500': action.variant === 'secondary',
              'hover:bg-red-100 text-red-500': action.variant === 'danger',
              'hover:bg-green-100 text-green-500': action.variant === 'success',
            },
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
          onClick={() => action.onClick(row)}
          disabled={isLoading || action.disabled?.(row)}
        >
          {action.icon}
        </button>
      ))}
    </div>
  );
}
