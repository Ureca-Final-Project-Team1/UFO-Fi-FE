'use client';

import React from 'react';

import { CircleMinusIcon, ReturnIcon } from '../Icons/CustomIcons';
import Pagination from '../Pagination/Pagination';

interface Column<T = unknown> {
  Header: string;
  accessor: keyof T | string;
}

interface TableRowBase {
  id?: string | number;
  actions?: { deactivateIcon?: React.ReactNode; activateIcon?: React.ReactNode };
}

interface TableProps<T extends TableRowBase> {
  columns: Column<T>[];
  data: T[];
  onActivateClick?: (row: T) => void;
  onDeactivateClick?: (row: T) => void;
  // 페이지네이션 관련 props
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  showPagination?: boolean;
}

const Table = <T extends TableRowBase>({
  columns,
  data,
  onActivateClick,
  onDeactivateClick,
  page = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  showPagination = false,
}: TableProps<T>) => {
  const handleActivate = (row: T) => {
    onActivateClick?.(row);
  };
  const handleDeactivate = (row: T) => {
    onDeactivateClick?.(row);
  };

  // 페이지네이션을 위한 데이터 슬라이싱
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
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
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-gray-400">
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, i) => (
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
                          <button
                            type="button"
                            aria-label="비활성화"
                            className="w-7 h-7 flex items-center justify-center rounded-full p-0 hover:bg-red-100 transition-colors text-red-500"
                            onClick={() => handleDeactivate(row)}
                          >
                            {row.actions?.deactivateIcon ?? <CircleMinusIcon className="w-5 h-5" />}
                          </button>
                          <button
                            type="button"
                            aria-label="활성화"
                            className="w-7 h-7 flex items-center justify-center rounded-full p-0 hover:bg-green-100 transition-colors text-green-500"
                            onClick={() => handleActivate(row)}
                          >
                            {row.actions?.activateIcon ?? <ReturnIcon className="w-5 h-5" />}
                          </button>
                        </div>
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

      {/* 페이지네이션 */}
      {showPagination && data.length > 0 && onPageChange && (
        <div className="flex items-center justify-between">
          {/* 페이지 크기 선택 */}
          {onPageSizeChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">페이지당 행 수:</span>
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          )}

          {/* 페이지네이션 컴포넌트 */}
          <Pagination page={page} total={totalPages} onChange={onPageChange} className="flex-1" />

          {/* 데이터 정보 */}
          <div className="text-sm text-gray-600">
            {startIndex + 1}-{Math.min(endIndex, data.length)} / {data.length}개
          </div>
        </div>
      )}
    </div>
  );
};

export { Table };
