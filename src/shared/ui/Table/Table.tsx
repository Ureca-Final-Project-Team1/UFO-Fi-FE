'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useTableSelection, useTableGrid } from '@/shared/hooks';

import { BaseTableProps, BaseTableRow } from './Table.types';
import { TableActions } from './TableActions/TableActions';
import { TableCheckbox } from './TableCheckbox/TableCheckbox';
import { TableSkeleton } from './TableSkeleton';
import Pagination from '../Pagination/Pagination';

export function Table<T extends BaseTableRow>({
  columns,
  data,
  actions,
  selection,
  pagination,
  isLoading = false,
  emptyMessage = '데이터가 없습니다.',
  className,
}: BaseTableProps<T>) {
  const selectionHooks = useTableSelection({
    data,
    selectedIds: selection?.selectedIds ?? [],
    onSelectionChange: selection?.onSelectionChange ?? (() => {}),
  });

  const { gridTemplate, mobileGridTemplate } = useTableGrid({
    columns,
    hasSelection: !!selection?.enabled,
    hasActions: !!actions,
  });

  return (
    <div className={cn('space-y-4', className)}>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div
          className="hidden md:grid gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700"
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {selection?.enabled && (
            <div className="flex items-center justify-center">
              <TableCheckbox
                checked={selectionHooks.isAllSelected || false}
                indeterminate={selectionHooks.isPartiallySelected}
                onChange={selectionHooks.handleSelectAll}
                disabled={isLoading || data.length === 0}
                label={selection.selectAllLabel || '모두 선택'}
              />
            </div>
          )}

          {columns.map((col) => (
            <div key={String(col.accessor)} className="flex items-center">
              {col.Header}
            </div>
          ))}

          {actions && <div className="flex items-center justify-center">관리</div>}
        </div>

        {/* 모바일 헤더 */}
        <div
          className="md:hidden grid gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700"
          style={{ gridTemplateColumns: mobileGridTemplate }}
        >
          {selection?.enabled && (
            <div className="flex items-center justify-center">
              <TableCheckbox
                checked={selectionHooks.isAllSelected}
                indeterminate={selectionHooks.isPartiallySelected}
                onChange={selectionHooks.handleSelectAll}
                disabled={isLoading || data.length === 0}
              />
            </div>
          )}

          {columns
            .filter((col) => !col.mobileHidden)
            .map((col) => (
              <div key={String(col.accessor)} className="flex items-center">
                {col.Header}
              </div>
            ))}

          {actions && <div className="flex items-center justify-center">관리</div>}
        </div>

        {/* 데이터 행들 */}
        <div className="divide-y divide-gray-100">
          {isLoading ? (
            <TableSkeleton
              columns={columns}
              hasSelection={!!selection?.enabled}
              hasActions={!!actions}
              gridTemplate={gridTemplate}
            />
          ) : data.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">{emptyMessage}</div>
          ) : (
            data.map((row, rowIndex) => (
              <React.Fragment key={row.id ?? rowIndex}>
                {/* 데스크톱 행 */}
                <div
                  className={cn(
                    'hidden md:grid gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-sm',
                    selection?.selectedIds.includes(row.id) && 'bg-blue-50',
                  )}
                  style={{ gridTemplateColumns: gridTemplate }}
                >
                  {selection?.enabled && (
                    <div className="flex items-center justify-center">
                      <TableCheckbox
                        checked={selection.selectedIds.includes(row.id)}
                        onChange={() => selectionHooks.handleSelectRow(row.id)}
                        disabled={isLoading}
                      />
                    </div>
                  )}

                  {columns.map((col) => (
                    <div key={String(col.accessor)} className="flex items-center text-gray-900">
                      {col.render
                        ? col.render(row[col.accessor as keyof T], row)
                        : String(row[col.accessor as keyof T] ?? '')}
                    </div>
                  ))}

                  {actions && <TableActions row={row} actions={actions} isLoading={isLoading} />}
                </div>

                {/* 모바일 행 */}
                <div
                  className={cn(
                    'md:hidden grid gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-sm',
                    selection?.selectedIds.includes(row.id) && 'bg-blue-50',
                  )}
                  style={{ gridTemplateColumns: mobileGridTemplate }}
                >
                  {selection?.enabled && (
                    <div className="flex items-center justify-center">
                      <TableCheckbox
                        checked={selection.selectedIds.includes(row.id)}
                        onChange={() => selectionHooks.handleSelectRow(row.id)}
                        disabled={isLoading}
                      />
                    </div>
                  )}

                  {columns
                    .filter((col) => !col.mobileHidden)
                    .map((col) => (
                      <div key={String(col.accessor)} className="flex items-center text-gray-900">
                        {col.render
                          ? col.render(row[col.accessor as keyof T], row)
                          : String(row[col.accessor as keyof T] ?? '')}
                      </div>
                    ))}

                  {actions && (
                    <TableActions row={row} actions={actions} isLoading={isLoading} size="sm" />
                  )}
                </div>
              </React.Fragment>
            ))
          )}
        </div>

        {/* 페이지네이션 */}
        {pagination?.enabled && pagination.totalPages > 1 && (
          <div className="px-4 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* 페이지 크기 선택 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">페이지당:</span>
              <select
                value={pagination.pageSize}
                onChange={(e) => pagination.onPageSizeChange(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
                disabled={isLoading}
              >
                {(pagination.pageSizeOptions || [10, 20, 50]).map((size) => (
                  <option key={size} value={size}>
                    {size}개
                  </option>
                ))}
              </select>
            </div>

            {/* 페이지네이션 컴포넌트 */}
            <Pagination
              page={pagination.currentPage}
              total={pagination.totalPages}
              onChange={pagination.onPageChange}
            />

            {/* 데이터 정보 */}
            <div className="text-sm text-gray-600">
              {(pagination.currentPage - 1) * pagination.pageSize + 1}-
              {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalElements)} /
              {pagination.totalElements}개
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
