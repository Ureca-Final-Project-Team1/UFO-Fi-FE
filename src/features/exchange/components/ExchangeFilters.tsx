'use client';

import { Carrier, CARRIER_DISPLAY_NAMES } from '@/backend/types/carrier';
import { Button, Icon, Chip } from '@/shared';

export interface FilterState {
  carrier?: Carrier;
  minTotalZet?: number;
  maxTotalZet?: number;
  minCapacity?: number;
  maxCapacity?: number;
}

interface ExchangeFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const ExchangeFilters = ({ filters, onFiltersChange, onReset }: ExchangeFiltersProps) => {
  // 통신사 선택 핸들러
  const handleCarrierSelect = (carrier: Carrier, closeDropdown: () => void) => {
    onFiltersChange({
      ...filters,
      carrier: filters.carrier === carrier ? undefined : carrier,
    });
    closeDropdown();
  };

  // 가격 필터 적용 핸들러
  const handlePriceFilter = (
    min: number | undefined,
    max: number | undefined,
    closeDropdown: () => void,
  ) => {
    onFiltersChange({
      ...filters,
      minTotalZet: min,
      maxTotalZet: max,
    });
    closeDropdown();
  };

  // 용량 필터 적용 핸들러
  const handleCapacityFilter = (
    min: number | undefined,
    max: number | undefined,
    closeDropdown: () => void,
  ) => {
    onFiltersChange({
      ...filters,
      minCapacity: min,
      maxCapacity: max,
    });
    closeDropdown();
  };

  // 통신사 드롭다운 컨텐츠
  const carrierDropdown = ({ closeDropdown }: { closeDropdown: () => void }) => (
    <div className="py-2 min-w-[120px]">
      {/* 전체 선택 옵션 */}
      <button
        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
          !filters.carrier ? 'bg-primary-600 text-white' : 'hover:bg-gray-100 text-black'
        }`}
        onClick={() => {
          onFiltersChange({ ...filters, carrier: undefined });
          closeDropdown();
        }}
      >
        전체
      </button>

      {/* 통신사별 선택 */}
      {Object.values(Carrier).map((carrier) => (
        <button
          key={carrier}
          className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
            filters.carrier === carrier
              ? 'bg-primary-600 text-white'
              : 'hover:bg-gray-100 text-black'
          }`}
          onClick={() => handleCarrierSelect(carrier, closeDropdown)}
        >
          {CARRIER_DISPLAY_NAMES[carrier]}
        </button>
      ))}
    </div>
  );

  // 가격 드롭다운 컨텐츠
  const priceDropdown = ({ closeDropdown }: { closeDropdown: () => void }) => (
    <div className="p-4 min-w-[200px] space-y-3">
      <p className="text-sm font-medium text-black">가격 범위 (ZET)</p>

      {/* 빠른 선택 옵션 */}
      <div className="space-y-2">
        <button
          className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 text-black"
          onClick={() => handlePriceFilter(undefined, 500, closeDropdown)}
        >
          ~ 500 ZET
        </button>
        <button
          className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 text-black"
          onClick={() => handlePriceFilter(500, 1500, closeDropdown)}
        >
          500 ~ 1,500 ZET
        </button>
        <button
          className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 text-black"
          onClick={() => handlePriceFilter(1500, undefined, closeDropdown)}
        >
          1,500 ZET ~
        </button>
        <button
          className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 text-black"
          onClick={() => handlePriceFilter(undefined, undefined, closeDropdown)}
        >
          전체
        </button>
      </div>

      {/* 구분선 */}
      <div className="border-t pt-2">
        <p className="text-xs text-gray-600 mb-2">직접 입력</p>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="최소"
            className="w-20 px-2 py-1 text-sm border rounded text-black"
            defaultValue={filters.minTotalZet || ''}
            onBlur={(e) => {
              const value = e.target.value ? Number(e.target.value) : undefined;
              onFiltersChange({ ...filters, minTotalZet: value });
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value;
                onFiltersChange({
                  ...filters,
                  minTotalZet: value ? Number(value) : undefined,
                });
                closeDropdown();
              }
            }}
          />
          <span className="text-sm text-gray-500">~</span>
          <input
            type="number"
            placeholder="최대"
            className="w-20 px-2 py-1 text-sm border rounded text-black"
            defaultValue={filters.maxTotalZet || ''}
            onBlur={(e) => {
              const value = e.target.value ? Number(e.target.value) : undefined;
              onFiltersChange({ ...filters, maxTotalZet: value });
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value;
                onFiltersChange({
                  ...filters,
                  maxTotalZet: value ? Number(value) : undefined,
                });
                closeDropdown();
              }
            }}
          />
        </div>
      </div>
    </div>
  );

  // 용량 드롭다운 컨텐츠
  const capacityDropdown = ({ closeDropdown }: { closeDropdown: () => void }) => (
    <div className="p-4 min-w-[200px] space-y-3">
      <p className="text-sm font-medium text-black">용량 범위 (GB)</p>

      {/* 빠른 선택 옵션 */}
      <div className="space-y-2">
        <button
          className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 text-black"
          onClick={() => handleCapacityFilter(1, 5, closeDropdown)}
        >
          1 ~ 5 GB
        </button>
        <button
          className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 text-black"
          onClick={() => handleCapacityFilter(5, 10, closeDropdown)}
        >
          5 ~ 10 GB
        </button>
        <button
          className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 text-black"
          onClick={() => handleCapacityFilter(undefined, undefined, closeDropdown)}
        >
          전체
        </button>
      </div>

      {/* 구분선 */}
      <div className="border-t pt-2">
        <p className="text-xs text-gray-600 mb-2">직접 입력</p>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="최소"
            className="w-20 px-2 py-1 text-sm border rounded text-black"
            defaultValue={filters.minCapacity || ''}
            onBlur={(e) => {
              const value = e.target.value ? Number(e.target.value) : undefined;
              onFiltersChange({ ...filters, minCapacity: value });
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value;
                onFiltersChange({
                  ...filters,
                  minCapacity: value ? Number(value) : undefined,
                });
                closeDropdown();
              }
            }}
          />
          <span className="text-sm text-gray-500">~</span>
          <input
            type="number"
            placeholder="최대"
            className="w-20 px-2 py-1 text-sm border rounded text-black"
            defaultValue={filters.maxCapacity || ''}
            onBlur={(e) => {
              const value = e.target.value ? Number(e.target.value) : undefined;
              onFiltersChange({ ...filters, maxCapacity: value });
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value;
                onFiltersChange({
                  ...filters,
                  maxCapacity: value ? Number(value) : undefined,
                });
                closeDropdown();
              }
            }}
          />
        </div>
      </div>
    </div>
  );

  const hasFilters = Boolean(
    filters.carrier ||
      filters.minTotalZet ||
      filters.maxTotalZet ||
      filters.minCapacity ||
      filters.maxCapacity,
  );

  const getFilterText = (type: 'carrier' | 'capacity' | 'price') => {
    switch (type) {
      case 'carrier':
        return filters.carrier ? CARRIER_DISPLAY_NAMES[filters.carrier] : '통신사';
      case 'capacity':
        if (filters.minCapacity || filters.maxCapacity) {
          const min = filters.minCapacity || 0;
          const max = filters.maxCapacity || '∞';
          return `용량 ${min}~${max}GB`;
        }
        return '용량';
      case 'price':
        if (filters.minTotalZet || filters.maxTotalZet) {
          const min = filters.minTotalZet || 0;
          const max = filters.maxTotalZet || '∞';
          return `가격 ${min}~${max}ZET`;
        }
        return '가격';
      default:
        return '';
    }
  };

  return (
    <section
      aria-labelledby="exchange-filters"
      className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:relative"
    >
      <h2 id="exchange-filters" className="sr-only">
        거래소 필터 및 정렬 옵션
      </h2>

      {/* 필터 칩들 */}
      <div className="flex flex-wrap gap-2 z-50" role="group" aria-label="거래 게시물 필터">
        {/* 통신사 필터 칩 */}
        <Chip
          selected={!!filters.carrier}
          dropdown={carrierDropdown}
          aria-label="통신사별 필터"
          className="px-3 py-2"
        >
          {getFilterText('carrier')}
        </Chip>

        {/* 용량 필터 칩 */}
        <Chip
          selected={!!(filters.minCapacity || filters.maxCapacity)}
          dropdown={capacityDropdown}
          aria-label="데이터 용량별 필터"
          className="px-3 py-2"
        >
          {getFilterText('capacity')}
        </Chip>

        {/* 가격 필터 칩 */}
        <Chip
          selected={!!(filters.minTotalZet || filters.maxTotalZet)}
          dropdown={priceDropdown}
          aria-label="가격별 필터"
          className="px-3 py-2"
        >
          {getFilterText('price')}
        </Chip>

        {/* 초기화 버튼 */}
        {hasFilters && (
          <Button
            size="sm"
            variant="secondary"
            onClick={onReset}
            className="text-xs py-1 h-auto"
            aria-label="필터 초기화"
          >
            <Icon name="RotateCw" className="size-3 mr-1" />
            초기화
          </Button>
        )}
      </div>
    </section>
  );
};
