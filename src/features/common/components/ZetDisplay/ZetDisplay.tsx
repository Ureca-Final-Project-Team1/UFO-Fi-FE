import React, { ComponentProps } from 'react';

type ZetDisplayProps = ComponentProps<'span'> & {
  amount?: number;
  showUnit?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

// 조건부 스타일링을 위한 객체들
const sizeClassesMap = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const unitStyleMap = {
  base: 'ml-1',
};

export const formatZetAmount = (amount: number): string => {
  if (amount >= 99999) {
    return '99,999+';
  }
  return amount.toLocaleString();
};

export const ZetDisplay: React.FC<ZetDisplayProps> = (props) => {
  const { amount = 0, showUnit = true, size = 'md', ...rest } = props;

  const formattedAmount = formatZetAmount(amount);

  return (
    <span className={`${sizeClassesMap[size]} ${rest.className || ''}`} {...rest}>
      {formattedAmount}
      {showUnit && <span className={unitStyleMap.base}>ZET</span>}
    </span>
  );
};
