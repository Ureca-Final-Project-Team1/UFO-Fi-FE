// src/shared/ui/Table/EnhancedTable.tsx
'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import { CircleMinusIcon, ReturnIcon } from '../Icons/CustomIcons';
import Pagination from '../Pagination/Pagination';

interface Column<T = unknown> {
  Header: string;
  accessor: keyof T | string;
  width?: string; // 그리드 컬럼 너비
  mobileHidden?: boolean; // 모바일에서 숨길지 여부
}

interface TableRowBase {
  id?: string | number;
  actions?: {
    deactivateIcon?: React.ReactNode;
    activateIcon?: React.ReactNode;
    hideActivate?: boolean; // 활성화 버튼 숨기기
    hideDeactivate?: boolean; // 비활성화 버튼 숨기기
  };
}

interface EnhancedTableProps<T extends TableRowBase> {
  columns: Column<T>[];
  data: T[];

  // 액션 핸들러
  onActivateClick?: (row: T) => void;
  onDeactivateClick?: (row: T) => void;

  // 체크박스 기능
  enableSelection?: boolean;
  selectedIds?: (string | number)[];
  onSelectionChange?: (selectedIds: (string | number)[]) => void;

  // 페이지네이션 (외부 제어)
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  totalElements?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;

  isLoading?: boolean;
  className?: string;
  emptyMessage?: string;
}

export function EnhancedTable<T extends TableRowBase>({
  columns,
  data,
  onActivateClick,
  onDeactivateClick,
  enableSelection = false,
  selectedIds = [],
  onSelectionChange,
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  totalElements = 0,
  onPageChange,
  onPageSizeChange,
  isLoading = false,
  className,
  emptyMessage = '데이터가 없습니다.',
}: EnhancedTableProps<T>) {
  // 전체 선택/해제
  const handleSelectAll = () => {
    if (!onSelectionChange) return;

    if (selectedIds.length === data.length && data.length > 0) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map((row) => row.id!).filter((id) => id !== undefined));
    }
  };

  // 단일 선택/해제
  const handleSelectRow = (id: string | number) => {
    if (!onSelectionChange) return;

    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  // 그리드 템플릿 생성
  const gridTemplate = [
    enableSelection ? '50px' : '',
    ...columns.map((col) => col.width || '1fr'),
    onActivateClick || onDeactivateClick ? 'minmax(120px, 150px)' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // 모바일용 그리드 템플릿 (일부 컬럼 숨김)
  const mobileGridTemplate = [
    enableSelection ? '50px' : '',
    ...columns.filter((col) => !col.mobileHidden).map((col) => col.width || '1fr'),
    onActivateClick || onDeactivateClick ? '100px' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cn('space-y-4', className)}>
      {/* 테이블 컨테이너 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* 헤더 */}
        <div
          className={cn(
            'hidden md:grid gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700',
          )}
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {enableSelection && (
            <div className="flex items-center justify-center">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={data.length > 0 && selectedIds.length === data.length}
                  onChange={handleSelectAll}
                  disabled={isLoading || data.length === 0}
                  className="sr-only" // 기본 체크박스 숨기기
                />
                <div
                  onClick={() => !(isLoading || data.length === 0) && handleSelectAll()}
                  className={`
                    w-5 h-5 border-2 rounded-sm cursor-pointer transition-all duration-200
                    flex items-center justify-center
                    ${
                      data.length > 0 && selectedIds.length === data.length
                        ? 'bg-blue-600 border-blue-600'
                        : 'bg-white border-gray-400 hover:border-blue-400'
                    }
                    ${isLoading || data.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {data.length > 0 && selectedIds.length === data.length && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          )}

          {columns.map((col) => (
            <div key={String(col.accessor)} className="flex items-center">
              {col.Header}
            </div>
          ))}

          {(onActivateClick || onDeactivateClick) && (
            <div className="flex items-center justify-center">관리</div>
          )}
        </div>

        {/* 모바일 헤더 */}
        <div
          className={cn(
            'md:hidden grid gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700',
          )}
          style={{ gridTemplateColumns: mobileGridTemplate }}
        >
          {enableSelection && (
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                checked={data.length > 0 && selectedIds.length === data.length}
                onChange={handleSelectAll}
                disabled={isLoading || data.length === 0}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
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

          {(onActivateClick || onDeactivateClick) && (
            <div className="flex items-center justify-center">관리</div>
          )}
        </div>

        {/* 데이터 행들 */}
        <div className="divide-y divide-gray-100">
          {isLoading ? (
            // 로딩 스켈레톤
            Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={cn('hidden md:grid gap-4 px-4 py-3 animate-pulse')}
                style={{ gridTemplateColumns: gridTemplate }}
              >
                {enableSelection && <div className="h-4 bg-gray-200 rounded" />}
                {columns.map((_, colIndex) => (
                  <div key={colIndex} className="h-4 bg-gray-200 rounded" />
                ))}
                {(onActivateClick || onDeactivateClick) && (
                  <div className="h-4 bg-gray-200 rounded" />
                )}
              </div>
            ))
          ) : data.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">{emptyMessage}</div>
          ) : (
            data.map((row, rowIndex) => (
              <React.Fragment key={row.id ?? rowIndex}>
                {/* 데스크톱 행 */}
                <div
                  className={cn(
                    'hidden md:grid gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-sm',
                    selectedIds.includes(row.id!) && 'bg-blue-50',
                  )}
                  style={{ gridTemplateColumns: gridTemplate }}
                >
                  {enableSelection && (
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(row.id!)}
                          onChange={() => handleSelectRow(row.id!)}
                          disabled={isLoading}
                          className="sr-only" // 기본 체크박스 숨기기
                        />
                        <div
                          onClick={() => !isLoading && handleSelectRow(row.id!)}
                          className={`
                            w-5 h-5 border-2 rounded-sm cursor-pointer transition-all duration-200
                            flex items-center justify-center
                            ${
                              selectedIds.includes(row.id!)
                                ? 'bg-blue-600 border-blue-600'
                                : 'bg-white border-gray-400 hover:border-blue-400'
                            }
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                        >
                          {selectedIds.includes(row.id!) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {columns.map((col) => (
                    <div key={String(col.accessor)} className="flex items-center text-gray-900">
                      {String(row[col.accessor as keyof T] ?? '')}
                    </div>
                  ))}

                  {(onActivateClick || onDeactivateClick) && (
                    <div className="flex items-center justify-center gap-2">
                      {onDeactivateClick && !row.actions?.hideDeactivate && (
                        <button
                          type="button"
                          aria-label="비활성화"
                          className="p-1 rounded-full hover:bg-red-100 transition-colors text-red-500"
                          onClick={() => onDeactivateClick(row)}
                          disabled={isLoading}
                        >
                          {row.actions?.deactivateIcon ?? <CircleMinusIcon className="w-5 h-5" />}
                        </button>
                      )}
                      {onActivateClick && !row.actions?.hideActivate && (
                        <button
                          type="button"
                          aria-label="활성화"
                          className="p-1 rounded-full hover:bg-green-100 transition-colors text-green-500"
                          onClick={() => onActivateClick(row)}
                          disabled={isLoading}
                        >
                          {row.actions?.activateIcon ?? <ReturnIcon className="w-5 h-5" />}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* 모바일 행 */}
                <div
                  className={cn(
                    'md:hidden grid gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-sm',
                    selectedIds.includes(row.id!) && 'bg-blue-50',
                  )}
                  style={{ gridTemplateColumns: mobileGridTemplate }}
                >
                  {enableSelection && (
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(row.id!)}
                        onChange={() => handleSelectRow(row.id!)}
                        disabled={isLoading}
                        className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-400 rounded-sm 
                                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                  checked:bg-blue-600 checked:border-blue-600
                                  disabled:opacity-50 disabled:cursor-not-allowed
                                  hover:border-blue-400 transition-colors"
                      />
                    </div>
                  )}

                  {columns
                    .filter((col) => !col.mobileHidden)
                    .map((col) => (
                      <div key={String(col.accessor)} className="flex items-center text-gray-900">
                        {String(row[col.accessor as keyof T] ?? '')}
                      </div>
                    ))}

                  {(onActivateClick || onDeactivateClick) && (
                    <div className="flex items-center justify-center gap-1">
                      {onDeactivateClick && !row.actions?.hideDeactivate && (
                        <button
                          type="button"
                          aria-label="비활성화"
                          className="p-1 rounded-full hover:bg-red-100 transition-colors text-red-500"
                          onClick={() => onDeactivateClick(row)}
                          disabled={isLoading}
                        >
                          {row.actions?.deactivateIcon ?? <CircleMinusIcon className="w-4 h-4" />}
                        </button>
                      )}
                      {onActivateClick && !row.actions?.hideActivate && (
                        <button
                          type="button"
                          aria-label="활성화"
                          className="p-1 rounded-full hover:bg-green-100 transition-colors text-green-500"
                          onClick={() => onActivateClick(row)}
                          disabled={isLoading}
                        >
                          {row.actions?.activateIcon ?? <ReturnIcon className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))
          )}
        </div>

        {/* 페이지네이션 */}
        {showPagination && totalPages > 1 && (
          <div className="px-4 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* 페이지 크기 선택 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">페이지당:</span>
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
                disabled={isLoading}
              >
                <option value={10}>10개</option>
                <option value={20}>20개</option>
                <option value={50}>50개</option>
              </select>
            </div>

            {/* 페이지네이션 컴포넌트 */}
            <Pagination
              page={currentPage}
              total={totalPages}
              onChange={(page) => onPageChange?.(page)}
            />

            {/* 데이터 정보 */}
            <div className="text-sm text-gray-600">
              {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalElements)} /{' '}
              {totalElements}개
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
