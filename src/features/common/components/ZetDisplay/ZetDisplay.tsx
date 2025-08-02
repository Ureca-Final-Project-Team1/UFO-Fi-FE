import React, { ComponentProps } from 'react';

type ZetDisplayProps = ComponentProps<'span'> & {
  amount?: number;
  showUnit?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export const formatZetAmount = (amount: number): string => {
  if (amount >= 99999) {
    return '99,999+';
  }
  return amount.toLocaleString();
};

export const ZetDisplay: React.FC<ZetDisplayProps> = (props) => {
  const { amount = 0, showUnit = true, size = 'md', ...rest } = props;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const formattedAmount = formatZetAmount(amount);

  return (
    <span className={`${sizeClasses[size]} ${rest.className || ''}`} {...rest}>
      {formattedAmount}
      {showUnit && <span className="ml-1">ZET</span>}
    </span>
  );
};
