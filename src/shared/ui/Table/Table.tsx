'use client';

import React from 'react';

import { CircleMinusIcon, ReturnIcon } from '../Icons/CustomIcons';

interface Column<T = unknown> {
  Header: string;
  accessor: keyof T | string;
}

interface TableRowBase {
  id?: string | number;
  actions?: {
    deactivateIcon?: React.ReactNode;
    activateIcon?: React.ReactNode;
    deleteIcon?: React.ReactNode;
  };
}

interface TableProps<T extends TableRowBase> {
  columns: Column<T>[];
  data: T[];
  onActivateClick?: (row: T) => void;
  onDeactivateClick?: (row: T) => void;
  onDeleteClick?: (row: T) => void;
}

const Table = <T extends TableRowBase>({
  columns,
  data,
  onActivateClick,
  onDeactivateClick,
  onDeleteClick,
}: TableProps<T>) => {
  const handleActivate = (row: T) => {
    onActivateClick?.(row);
  };
  const handleDeactivate = (row: T) => {
    onDeactivateClick?.(row);
  };
  const handleDelete = (row: T) => {
    onDeleteClick?.(row);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className={
                  `px-4 py-3 font-semibold border-b border-gray-200 whitespace-nowrap ` +
                  (col.accessor === 'actions' ? 'text-center' : 'text-left')
                }
              >
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-gray-400">
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={row.id ?? i}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.accessor)}
                    className={
                      `px-4 py-2 text-sm text-gray-900 whitespace-nowrap` +
                      (col.accessor === 'actions' ? ' text-center align-middle' : '')
                    }
                  >
                    {col.accessor === 'actions' ? (
                      <div className="flex justify-center items-center gap-3 min-h-[40px]">
                        {onDeleteClick && (
                          <button
                            type="button"
                            aria-label="삭제"
                            className="w-7 h-7 flex items-center justify-center rounded-full p-0 hover:bg-red-100 transition-colors text-red-500"
                            onClick={() => handleDelete(row)}
                          >
                            {row.actions?.deleteIcon ?? <CircleMinusIcon className="w-5 h-5" />}
                          </button>
                        )}
                        {onDeactivateClick && (
                          <button
                            type="button"
                            aria-label="비활성화"
                            className="w-7 h-7 flex items-center justify-center rounded-full p-0 hover:bg-red-100 transition-colors text-red-500"
                            onClick={() => handleDeactivate(row)}
                          >
                            {row.actions?.deactivateIcon ?? <CircleMinusIcon className="w-5 h-5" />}
                          </button>
                        )}
                        {onActivateClick && (
                          <button
                            type="button"
                            aria-label="활성화"
                            className="w-7 h-7 flex items-center justify-center rounded-full p-0 hover:bg-green-100 transition-colors text-green-500"
                            onClick={() => handleActivate(row)}
                          >
                            {row.actions?.activateIcon ?? <ReturnIcon className="w-5 h-5" />}
                          </button>
                        )}
                      </div>
                    ) : col.accessor === 'createdAt' && row[col.accessor as keyof T] ? (
                      new Date(row[col.accessor as keyof T] as string).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })
                    ) : (
                      String(row[col.accessor as keyof T] ?? '')
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export { Table };
