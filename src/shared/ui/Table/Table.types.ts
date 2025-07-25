import React from 'react';

export interface BaseTableRow {
  id: string | number;
  [key: string]: unknown;
}

export interface TableColumn<T extends BaseTableRow = BaseTableRow> {
  Header: string;
  accessor: keyof T | string;
  width?: string;
  mobileHidden?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode; // 커스텀 렌더링
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

export interface BaseTableProps<T extends BaseTableRow = BaseTableRow> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableActions<T>;
  selection?: TableSelection;
  pagination?: TablePagination;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export interface AdminTableProps<T extends BaseTableRow = BaseTableRow> extends BaseTableProps<T> {
  title?: string;
  description?: string;
  showExportButton?: boolean;
  onExport?: () => void;
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
