'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useTableSelection, useTableGrid } from '@/shared/hooks';

import { BaseTableProps, BaseTableRow } from './Table.types';
import { TableActions } from './TableActions/TableActions';
import { TableCheckbox } from './TableCheckbox/TableCheckbox';
import { TableSkeleton } from './TableSkeleton';
import {
  tableVariants,
  tableContainerVariants,
  tableHeaderVariants,
  tableMobileHeaderVariants,
  tableHeaderCellVariants,
  tableRowVariants,
  tableMobileRowVariants,
  tableCellVariants,
  tableEmptyVariants,
  tableDividerVariants,
  tablePaginationContainerVariants,
  tablePageSizeVariants,
  tablePageSizeSelectVariants,
  tableDataInfoVariants,
} from './TableVariants';
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
  // Main variants
  variant = 'default',
  size = 'md',
  theme = 'light',
  // Container variants
  containerVariant = 'default',
  containerTheme = 'light',
  containerElevation = 'md',
  // Header variants
  headerVariant = 'default',
  headerSize = 'md',
  headerTheme = 'light',
  // Row variants
  rowVariant = 'default',
  rowSize = 'md',
  rowTheme = 'light',
  // Cell variants
  cellAlignment = 'left',
  cellSize = 'md',
  cellTheme = 'light',
  cellTruncate = false,
  // Empty state variants
  emptySize = 'md',
  emptyTheme = 'light',
  // Divider variants
  dividerVariant = 'default',
  dividerTheme = 'light',
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
    <div
      className={cn(
        tableVariants({
          variant,
          size,
          theme,
        }),
        className,
      )}
    >
      <div
        className={cn(
          tableContainerVariants({
            variant: containerVariant,
            theme: containerTheme,
            elevation: containerElevation,
          }),
        )}
      >
        <div
          className={cn(
            tableHeaderVariants({
              variant: headerVariant,
              size: headerSize,
              theme: headerTheme,
            }),
          )}
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {selection?.enabled && (
            <div className={cn(tableHeaderCellVariants({ alignment: 'center' }))}>
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
            <div
              key={String(col.accessor)}
              className={cn(tableHeaderCellVariants({ alignment: 'left' }))}
            >
              {col.Header}
            </div>
          ))}

          {actions && (
            <div className={cn(tableHeaderCellVariants({ alignment: 'center' }))}>관리</div>
          )}
        </div>

        {/* 모바일 헤더 */}
        <div
          className={cn(
            tableMobileHeaderVariants({
              variant: headerVariant,
              size: headerSize,
              theme: headerTheme,
            }),
          )}
          style={{ gridTemplateColumns: mobileGridTemplate }}
        >
          {selection?.enabled && (
            <div className={cn(tableHeaderCellVariants({ alignment: 'center' }))}>
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
              <div
                key={String(col.accessor)}
                className={cn(tableHeaderCellVariants({ alignment: 'left' }))}
              >
                {col.Header}
              </div>
            ))}

          {actions && (
            <div className={cn(tableHeaderCellVariants({ alignment: 'center' }))}>관리</div>
          )}
        </div>

        {/* 데이터 행들 */}
        <div
          className={cn(
            tableDividerVariants({
              variant: dividerVariant,
              theme: dividerTheme,
            }),
          )}
        >
          {isLoading ? (
            <TableSkeleton
              columns={columns}
              hasSelection={!!selection?.enabled}
              hasActions={!!actions}
              gridTemplate={gridTemplate}
            />
          ) : data.length === 0 ? (
            <div
              className={cn(
                tableEmptyVariants({
                  size: emptySize,
                  theme: emptyTheme,
                }),
              )}
            >
              {emptyMessage}
            </div>
          ) : (
            data
              .filter((row) => row.id != null)
              .map((row) => (
                <React.Fragment key={row.id}>
                  {/* 데스크톱 행 */}
                  <div
                    className={cn(
                      tableRowVariants({
                        variant: rowVariant,
                        size: rowSize,
                        theme: rowTheme,
                        selected: selection?.selectedIds.includes(row.id) || false,
                      }),
                    )}
                    style={{ gridTemplateColumns: gridTemplate }}
                  >
                    {selection?.enabled && (
                      <div className={cn(tableCellVariants({ alignment: 'center' }))}>
                        <TableCheckbox
                          checked={selection.selectedIds.includes(row.id)}
                          onChange={() => selectionHooks.handleSelectRow(row.id)}
                          disabled={isLoading}
                        />
                      </div>
                    )}

                    {columns.map((col) => (
                      <div
                        key={String(col.accessor)}
                        className={cn(
                          tableCellVariants({
                            alignment: cellAlignment,
                            size: cellSize,
                            theme: cellTheme,
                            truncate: cellTruncate,
                          }),
                        )}
                      >
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
                      tableMobileRowVariants({
                        variant: rowVariant,
                        size: rowSize,
                        theme: rowTheme,
                        selected: selection?.selectedIds.includes(row.id) || false,
                      }),
                    )}
                    style={{ gridTemplateColumns: mobileGridTemplate }}
                  >
                    {selection?.enabled && (
                      <div className={cn(tableCellVariants({ alignment: 'center' }))}>
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
                        <div
                          key={String(col.accessor)}
                          className={cn(
                            tableCellVariants({
                              alignment: cellAlignment,
                              size: cellSize,
                              theme: cellTheme,
                              truncate: cellTruncate,
                            }),
                          )}
                        >
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
          <div
            className={cn(
              tablePaginationContainerVariants({
                size: rowSize,
                theme: rowTheme,
              }),
            )}
          >
            {/* 페이지 크기 선택 */}
            <div
              className={cn(
                tablePageSizeVariants({
                  size: cellSize,
                  theme: cellTheme,
                }),
              )}
            >
              <span className="text-sm text-gray-600">페이지당:</span>
              <select
                value={pagination.pageSize}
                onChange={(e) => pagination.onPageSizeChange(Number(e.target.value))}
                className={cn(
                  tablePageSizeSelectVariants({
                    size: cellSize,
                    theme: cellTheme,
                  }),
                )}
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
            <div
              className={cn(
                tableDataInfoVariants({
                  size: cellSize,
                  theme: cellTheme,
                }),
              )}
            >
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
