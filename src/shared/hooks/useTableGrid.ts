import { useMemo } from 'react';

import { BaseTableRow, TableColumn } from '../ui';

interface UseTableGridProps<T extends BaseTableRow> {
  columns: TableColumn<T>[];
  hasSelection: boolean;
  hasActions: boolean;
}

interface UseTableGridReturn {
  gridTemplate: string;
  mobileGridTemplate: string;
}

export function useTableGrid<T extends BaseTableRow>({
  columns,
  hasSelection,
  hasActions,
}: UseTableGridProps<T>): UseTableGridReturn {
  const gridTemplate = useMemo(
    () =>
      [
        hasSelection ? '50px' : '',
        ...columns.map((col) => col.width || '1fr'),
        hasActions ? 'minmax(120px, 150px)' : '',
      ]
        .filter(Boolean)
        .join(' '),
    [columns, hasSelection, hasActions],
  );

  const mobileGridTemplate = useMemo(
    () =>
      [
        hasSelection ? '50px' : '',
        ...columns.filter((col) => !col.mobileHidden).map((col) => col.width || '1fr'),
        hasActions ? '100px' : '',
      ]
        .filter(Boolean)
        .join(' '),
    [columns, hasSelection, hasActions],
  );

  return {
    gridTemplate,
    mobileGridTemplate,
  };
}
