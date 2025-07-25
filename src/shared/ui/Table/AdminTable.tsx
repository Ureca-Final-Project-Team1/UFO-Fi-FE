'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import { DataTable } from './DataTable';
import { AdminTableProps, BaseTableRow } from './Table.types';
import { Button } from '../Button/Button';

export function AdminTable<T extends BaseTableRow>({
  title,
  description,
  showExportButton = false,
  onExport,
  className,
  ...tableProps
}: AdminTableProps<T>) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* 헤더 영역 */}
      {(title || description || showExportButton) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            {title && <h2 className="text-xl font-bold text-gray-900">{title}</h2>}
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
          </div>

          {showExportButton && onExport && (
            <Button variant="outline" size="sm" onClick={onExport} icon="Download">
              내보내기
            </Button>
          )}
        </div>
      )}

      {/* 선택된 항목 알림 */}
      {tableProps.selection?.enabled && tableProps.selection.selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-blue-700 font-medium">
                {tableProps.selection.selectedIds.length}개의 항목이 선택되었습니다.
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => tableProps.selection?.onSelectionChange([])}
              >
                선택 해제
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 데이터 테이블 */}
      <DataTable {...tableProps} />
    </div>
  );
}
