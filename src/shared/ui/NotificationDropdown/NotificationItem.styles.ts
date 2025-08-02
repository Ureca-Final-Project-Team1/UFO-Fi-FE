export const notificationConfig = {
  BENEFIT: {
    icon: 'Gift',
    bgColor: '#f8efff', // --color-primary-100
    iconColor: '#b284f7', // --color-primary-300
  },
  SELL: {
    icon: 'CirclePlus',
    bgColor: '#f8efff', // --color-primary-100
    iconColor: '#b284f7', // --color-primary-300
  },
  INTERESTED_POST: {
    icon: 'Heart',
    bgColor: '#f8efff', // --color-primary-100
    iconColor: '#b284f7', // --color-primary-300
  },
  REPORTED: {
    icon: 'Shield',
    bgColor: 'bg-red-100',
    iconColor: '#DC2626', // red-600
  },
  FOLLOWER_POST: {
    icon: 'Users',
    bgColor: 'bg-blue-100',
    iconColor: '#2563EB', // blue-600
  },
  TRADE: {
    icon: 'RadioTower',
    bgColor: 'bg-blue-100',
    iconColor: '#2563EB', // blue-600
  },
} as const;

export const defaultValues = {
  onClick: () => {},
} as const;

export const containerStyleMap = {
  base: 'flex items-start gap-3 p-4 w-full cursor-pointer transition-colors border-l-4',
  unread: 'bg-blue-50/50 border-blue-200 hover:bg-blue-50',
  read: 'border-transparent hover:bg-gray-50',
} as const;

export const titleStyleMap = {
  base: 'text-sm leading-5',
  unread: 'font-bold text-gray-900',
  read: 'font-semibold text-gray-700',
} as const;

export const contentStyleMap = {
  base: 'text-sm leading-5 line-clamp-2',
  unread: 'text-gray-800',
  read: 'text-gray-600',
} as const;

export const badgeStyleMap = {
  container: 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
  unread: 'bg-blue-100 text-blue-800',
} as const;
