export interface PasswordPadProps {
  onComplete: (password: string) => void;
  onDelete: () => void;
  onClear: () => void;
  maxLength?: number;
  title?: string;
  subtitle?: React.ReactNode;
  disabled?: boolean;
}

export interface NumberButtonProps {
  number: number;
  onClick: (number: number) => void;
  disabled?: boolean;
}

export interface PasswordInputProps {
  value: string;
  maxLength: number;
  showDots?: boolean;
}
