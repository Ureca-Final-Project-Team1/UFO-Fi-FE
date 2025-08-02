import React from 'react';

interface ZetDisplayProps {
  amount: number;
  className?: string;
  showUnit?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const formatZetAmount = (amount: number): string => {
  if (amount >= 99999) {
    return '99,999+';
  }
  return amount.toLocaleString();
};

export const ZetDisplay: React.FC<ZetDisplayProps> = (props) => {
  const { amount, className = '', showUnit = true, size = 'md' } = props;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const formattedAmount = formatZetAmount(amount);

  return (
    <span className={`${sizeClasses[size]} ${className}`}>
      {formattedAmount}
      {showUnit && <span className="ml-1">ZET</span>}
    </span>
  );
};
