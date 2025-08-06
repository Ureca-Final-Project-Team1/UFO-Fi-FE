'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Table } from '@/shared';

import { AdminTableProps, BaseTableRow } from './Table.types';
import {
  adminTableHeaderVariants,
  adminTableTitleVariants,
  adminTableDescriptionVariants,
  adminTableSelectionAlertVariants,
  adminTableSelectionContentVariants,
  adminTableSelectionCountVariants,
  adminTableSelectionIndicatorVariants,
} from './TableVariants';
import { Button } from '../Button/Button';

export function AdminTable<T extends BaseTableRow>({
  title,
  description,
  showExportButton = false,
  onExport,
  className,
  // Header variants
  headerLayout = 'default',
  headerAlignment = 'between',
  headerSpacing = 'md',
  // Title variants
  titleSize = 'md',
  titleTheme = 'light',
  // Description variants
  descriptionSize = 'md',
  descriptionTheme = 'light',
  // Selection alert variants
  selectionAlertVariant = 'default',
  selectionAlertSize = 'md',
  selectionAlertTheme = 'light',
  // Selection content variants
  selectionContentLayout = 'default',
  selectionContentAlignment = 'between',
  selectionContentSpacing = 'md',
  // Selection count variants
  selectionCountSize = 'md',
  selectionCountTheme = 'light',
  selectionCountWeight = 'medium',
  // Selection indicator variants
  selectionIndicatorSize = 'md',
  selectionIndicatorVariant = 'default',
  ...tableProps
}: AdminTableProps<T>) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* 헤더 영역 */}
      {(title || description || showExportButton) && (
        <div
          className={cn(
            adminTableHeaderVariants({
              layout: headerLayout,
              alignment: headerAlignment,
              spacing: headerSpacing,
            }),
          )}
        >
          <div>
            {title && (
              <h2
                className={cn(
                  adminTableTitleVariants({
                    size: titleSize,
                    theme: titleTheme,
                  }),
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  adminTableDescriptionVariants({
                    size: descriptionSize,
                    theme: descriptionTheme,
                  }),
                )}
              >
                {description}
              </p>
            )}
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
        <div
          className={cn(
            adminTableSelectionAlertVariants({
              variant: selectionAlertVariant,
              size: selectionAlertSize,
              theme: selectionAlertTheme,
            }),
          )}
        >
          <div
            className={cn(
              adminTableSelectionContentVariants({
                layout: selectionContentLayout,
                alignment: selectionContentAlignment,
                spacing: selectionContentSpacing,
              }),
            )}
          >
            <div
              className={cn(
                adminTableSelectionCountVariants({
                  size: selectionCountSize,
                  theme: selectionCountTheme,
                  weight: selectionCountWeight,
                }),
              )}
            >
              <div
                className={cn(
                  adminTableSelectionIndicatorVariants({
                    size: selectionIndicatorSize,
                    variant: selectionIndicatorVariant,
                  }),
                )}
              />
              <span>{tableProps.selection.selectedIds.length}개의 항목이 선택되었습니다.</span>
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
      <Table {...tableProps} />
    </div>
  );
}
