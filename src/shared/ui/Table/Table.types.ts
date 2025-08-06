import type { VariantProps } from 'class-variance-authority';
import React from 'react';

import {
  tableVariants,
  tableContainerVariants,
  tableHeaderVariants,
  tableRowVariants,
  tableCellVariants,
  tableEmptyVariants,
  tableDividerVariants,
  adminTableHeaderVariants,
  adminTableTitleVariants,
  adminTableDescriptionVariants,
  adminTableSelectionAlertVariants,
  adminTableSelectionContentVariants,
  adminTableSelectionCountVariants,
  adminTableSelectionIndicatorVariants,
} from './TableVariants';

export interface BaseTableRow {
  id: string | number;
  [key: string]: unknown;
}

export interface TableColumn<T extends BaseTableRow = BaseTableRow> {
  Header: string;
  accessor: keyof T | string;
  width?: string;
  mobileHidden?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface ActionButton<T extends BaseTableRow = BaseTableRow> {
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  disabled?: (row: T) => boolean;
  tooltip?: string;
}

export interface TableActions<T extends BaseTableRow = BaseTableRow> {
  edit?: ActionButton<T>;
  delete?: ActionButton<T>;
  activate?: ActionButton<T>;
  deactivate?: ActionButton<T>;
  custom?: Array<
    ActionButton<T> & {
      variant?: 'primary' | 'secondary' | 'danger' | 'success';
    }
  >;
}

export interface TableSelection {
  enabled: boolean;
  selectedIds: (string | number)[];
  onSelectionChange: (selectedIds: (string | number)[]) => void;
  selectAllLabel?: string;
}

export interface TablePagination {
  enabled: boolean;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

// Table Props
export interface BaseTableProps<T extends BaseTableRow = BaseTableRow>
  extends VariantProps<typeof tableVariants> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableActions<T>;
  selection?: TableSelection;
  pagination?: TablePagination;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  onActivateClick?: (row: T) => void;
  onDeactivateClick?: (row: T) => void;
  // Container variants
  containerVariant?: VariantProps<typeof tableContainerVariants>['variant'];
  containerTheme?: VariantProps<typeof tableContainerVariants>['theme'];
  containerElevation?: VariantProps<typeof tableContainerVariants>['elevation'];
  // Header variants
  headerVariant?: VariantProps<typeof tableHeaderVariants>['variant'];
  headerSize?: VariantProps<typeof tableHeaderVariants>['size'];
  headerTheme?: VariantProps<typeof tableHeaderVariants>['theme'];
  // Row variants
  rowVariant?: VariantProps<typeof tableRowVariants>['variant'];
  rowSize?: VariantProps<typeof tableRowVariants>['size'];
  rowTheme?: VariantProps<typeof tableRowVariants>['theme'];
  // Cell variants
  cellAlignment?: VariantProps<typeof tableCellVariants>['alignment'];
  cellSize?: VariantProps<typeof tableCellVariants>['size'];
  cellTheme?: VariantProps<typeof tableCellVariants>['theme'];
  cellTruncate?: VariantProps<typeof tableCellVariants>['truncate'];
  // Empty state variants
  emptySize?: VariantProps<typeof tableEmptyVariants>['size'];
  emptyTheme?: VariantProps<typeof tableEmptyVariants>['theme'];
  // Divider variants
  dividerVariant?: VariantProps<typeof tableDividerVariants>['variant'];
  dividerTheme?: VariantProps<typeof tableDividerVariants>['theme'];
}

// Admin Table Props
export interface AdminTableProps<T extends BaseTableRow = BaseTableRow> extends BaseTableProps<T> {
  title?: string;
  description?: string;
  showExportButton?: boolean;
  onExport?: () => void;
  // Header variants
  headerLayout?: VariantProps<typeof adminTableHeaderVariants>['layout'];
  headerAlignment?: VariantProps<typeof adminTableHeaderVariants>['alignment'];
  headerSpacing?: VariantProps<typeof adminTableHeaderVariants>['spacing'];
  // Title variants
  titleSize?: VariantProps<typeof adminTableTitleVariants>['size'];
  titleTheme?: VariantProps<typeof adminTableTitleVariants>['theme'];
  // Description variants
  descriptionSize?: VariantProps<typeof adminTableDescriptionVariants>['size'];
  descriptionTheme?: VariantProps<typeof adminTableDescriptionVariants>['theme'];
  // Selection alert variants
  selectionAlertVariant?: VariantProps<typeof adminTableSelectionAlertVariants>['variant'];
  selectionAlertSize?: VariantProps<typeof adminTableSelectionAlertVariants>['size'];
  selectionAlertTheme?: VariantProps<typeof adminTableSelectionAlertVariants>['theme'];
  // Selection content variants
  selectionContentLayout?: VariantProps<typeof adminTableSelectionContentVariants>['layout'];
  selectionContentAlignment?: VariantProps<typeof adminTableSelectionContentVariants>['alignment'];
  selectionContentSpacing?: VariantProps<typeof adminTableSelectionContentVariants>['spacing'];
  // Selection count variants
  selectionCountSize?: VariantProps<typeof adminTableSelectionCountVariants>['size'];
  selectionCountTheme?: VariantProps<typeof adminTableSelectionCountVariants>['theme'];
  selectionCountWeight?: VariantProps<typeof adminTableSelectionCountVariants>['weight'];
  // Selection indicator variants
  selectionIndicatorSize?: VariantProps<typeof adminTableSelectionIndicatorVariants>['size'];
  selectionIndicatorVariant?: VariantProps<typeof adminTableSelectionIndicatorVariants>['variant'];
}

export interface TableCheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
}

export interface TableActionsProps<T extends BaseTableRow = BaseTableRow> {
  row: T;
  actions: TableActions<T>;
  isLoading?: boolean;
  size?: 'sm' | 'md';
}

export interface TableSkeletonProps<T extends BaseTableRow = BaseTableRow> {
  columns: TableColumn<T>[];
  hasSelection: boolean;
  hasActions: boolean;
  rows?: number;
  gridTemplate: string;
}

// Table Size Types
export type TableSize = 'sm' | 'md' | 'lg' | 'xl';

// Table Variant Types
export type TableVariant = 'default' | 'bordered' | 'striped' | 'compact' | 'spacious';

// Table Theme Types
export type TableTheme = 'light' | 'dark' | 'custom';

// Table Elevation Types
export type TableElevation = 'none' | 'sm' | 'md' | 'lg' | 'xl';

// Table Alignment Types
export type TableAlignment = 'left' | 'center' | 'right' | 'between';

// Table Layout Types
export type TableLayout = 'default' | 'horizontal' | 'vertical';

// Table Weight Types
export type TableWeight = 'normal' | 'medium' | 'semibold' | 'bold';
