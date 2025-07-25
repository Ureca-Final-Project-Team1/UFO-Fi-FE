import { useCallback } from 'react';

import { BaseTableRow } from '../ui/Table/Table.types';

interface UseTableSelectionProps<T extends BaseTableRow> {
  data: T[];
  selectedIds: (string | number)[];
  onSelectionChange: (selectedIds: (string | number)[]) => void;
}

interface UseTableSelectionReturn {
  handleSelectAll: () => void;
  handleSelectRow: (id: string | number) => void;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
}

export function useTableSelection<T extends BaseTableRow>({
  data,
  selectedIds,
  onSelectionChange,
}: UseTableSelectionProps<T>): UseTableSelectionReturn {
  // 전체 선택/해제
  const handleSelectAll = useCallback(() => {
    if (selectedIds.length === data.length && data.length > 0) {
      onSelectionChange([]);
    } else {
      const validIds = data
        .map((row) => row.id)
        .filter((id): id is string | number => id !== undefined);
      onSelectionChange(validIds);
    }
  }, [data, selectedIds, onSelectionChange]);

  // 단일 선택/해제
  const handleSelectRow = useCallback(
    (id: string | number) => {
      if (selectedIds.includes(id)) {
        onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
      } else {
        onSelectionChange([...selectedIds, id]);
      }
    },
    [selectedIds, onSelectionChange],
  );

  // 선택 상태 확인
  const isAllSelected = data.length > 0 && selectedIds.length === data.length;
  const isPartiallySelected = selectedIds.length > 0 && selectedIds.length < data.length;

  return {
    handleSelectAll,
    handleSelectRow,
    isAllSelected,
    isPartiallySelected,
  };
}
