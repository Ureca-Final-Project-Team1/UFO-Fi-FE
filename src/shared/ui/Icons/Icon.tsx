import React, { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { errorMessages, defaultValues, customIconComponents } from './Icon.styles';
import { IconProps, IconType, CustomIconType, LucideIconType } from './Icons.types';
import { ImageIcon } from './ImageIcon';
import { LucideIcon } from './LucideIcon';

type IconComponentProps = ComponentProps<'span'> &
  IconProps & {
    name?: IconType;
    src?: string;
    alt?: string;
  };

/**
 * 통합 아이콘 컴포넌트
 * Lucide 아이콘, 커스텀 SVG 아이콘, 이미지 아이콘을 하나의 인터페이스로 사용
 */
export const Icon: React.FC<IconComponentProps> = (props) => {
  const {
    name = defaultValues.name,
    src = defaultValues.src,
    alt = defaultValues.alt,
    onClick = defaultValues.onClick,
    className = defaultValues.className,
    ...rest
  } = props;

  if (src) {
    return (
      <ImageIcon
        src={src}
        alt={alt || name || 'icon'}
        onClick={onClick}
        className={cn(className, onClick && 'cursor-pointer')}
        {...rest}
      />
    );
  }

  if (!name) {
    console.warn(errorMessages.iconError);
    return null;
  }

  if (name in customIconComponents) {
    const CustomIconComponent = customIconComponents[name as CustomIconType];
    return (
      <CustomIconComponent
        onClick={onClick}
        className={cn(className, onClick && 'cursor-pointer')}
        {...rest}
      />
    );
  }

  try {
    return (
      <LucideIcon
        name={name as LucideIconType}
        onClick={onClick}
        className={cn(className, onClick && 'cursor-pointer')}
        {...rest}
      />
    );
  } catch (error) {
    console.warn(errorMessages.iconNotFound(name), error);
    return (
      <LucideIcon
        name="AlertCircle"
        onClick={onClick}
        className={cn(className, onClick && 'cursor-pointer')}
        {...rest}
      />
    );
  }
};

export { LucideIcon, ImageIcon };
export * from './CustomIcons';
