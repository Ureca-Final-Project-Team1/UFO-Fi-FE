export const stepStateMap = {
  completed: 'completed',
  active: 'active',
  pending: 'pending',
} as const;

export const hoverStyleMap = {
  enabled: 'hover:scale-110',
  disabled: '',
} as const;

export const cursorStyleMap = {
  clickable: 'cursor-pointer',
  nonClickable: '',
} as const;

export const ariaLabelMap = {
  format: (stepNumber: number, totalSteps: number) => `Step ${stepNumber} of ${totalSteps}`,
} as const;
