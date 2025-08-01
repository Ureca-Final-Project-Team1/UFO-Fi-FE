// NotificationDropdown 컴포넌트 스타일 맵
export const dropdownContentStyle = {
  base: 'w-80 max-h-[500px] overflow-hidden p-0 shadow-xl border border-gray-200 bg-white',
} as const;

export const headerStyle = {
  container: 'px-4 py-3 border-b border-gray-100 bg-gray-50/80 backdrop-blur-sm',
  title: 'text-sm font-bold text-gray-900 flex items-center gap-2',
  badge: 'bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full',
  markAllButton:
    'text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors hover:underline',
} as const;

export const contentStyle = {
  container: 'max-h-96 overflow-y-auto overscroll-contain',
  loadingContainer: 'flex flex-col items-center justify-center py-12',
  loadingIcon: 'size-8 animate-spin text-blue-500 mb-3',
  loadingText: 'text-sm text-gray-500 font-medium',
  emptyContainer: 'py-12 px-6 text-center',
  emptyIconContainer:
    'size-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4',
  emptyIcon: 'size-8 text-gray-400',
  emptyTitle: 'text-sm font-semibold text-gray-900 mb-2',
  emptyDescription: 'text-xs text-gray-500',
  listContainer: 'divide-y divide-gray-50',
} as const;

export const messageMap = {
  loading: '알림을 불러오는 중...',
  empty: {
    title: '알림이 없습니다',
    description: '새로운 알림이 도착하면 여기에 표시됩니다',
  },
  markAllRead: '모두 읽음',
} as const;
