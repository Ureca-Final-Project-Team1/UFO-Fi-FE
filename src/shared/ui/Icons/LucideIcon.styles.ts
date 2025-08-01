import { LucideIconType } from './Icons.types';

export const errorMessages = {
  notFound: (name: string) => `Not found "${name}"`,
} as const;

export const defaultValues = {
  name: 'HelpCircle' as LucideIconType,
  size: 'md',
  color: 'current',
  className: '',
} as const;
