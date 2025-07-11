import { InputHTMLAttributes } from 'react';

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'whiteBorder' | 'blueFill';
  label?: string;
  error?: string;
}
