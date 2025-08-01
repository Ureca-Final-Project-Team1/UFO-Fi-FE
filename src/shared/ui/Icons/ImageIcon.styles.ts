export const fallbackStyleMap = {
  container: 'flex items-center justify-center bg-gray-100 rounded text-gray-400',
  icon: 'text-gray-400',
  loading: 'animate-spin',
} as const;

export const spanStyleMap = {
  base: 'inline-flex items-center justify-center shrink-0',
  withRelative: 'inline-flex items-center justify-center shrink-0 relative',
} as const;

export const imageStyleMap = {
  base: 'object-contain transition-opacity duration-200',
  loading: 'opacity-0',
  loaded: 'opacity-100',
} as const;

export const errorMessages = {
  invalidSrc: (src: string) => `Invalid src prop provided to ImageIcon: "${src}"`,
  loadFailed: (src: string) => `ImageIcon failed to load: ${src}`,
} as const;
