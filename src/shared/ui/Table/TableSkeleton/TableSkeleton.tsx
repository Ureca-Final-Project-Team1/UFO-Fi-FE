import React from 'react';

import { TableSkeletonProps, BaseTableRow } from '../Table.types';

export function TableSkeleton<T extends BaseTableRow>({
  columns,
  hasSelection,
  hasActions,
  rows = 5,
  gridTemplate,
}: TableSkeletonProps<T>) {
  return (
    <>
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className="hidden md:grid gap-4 px-4 py-3 animate-pulse"
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {hasSelection && <div className="h-4 bg-gray-200 rounded" />}
          {columns.map((_, colIndex) => (
            <div key={colIndex} className="h-4 bg-gray-200 rounded" />
          ))}
          {hasActions && <div className="h-4 bg-gray-200 rounded" />}
        </div>
      ))}
    </>
  );
}
