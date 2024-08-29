import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { useMemo } from 'react';
import '../styles/global.css';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

import type { BaseAtomProps } from '../lib/types.ts';
import { cn } from '../lib/utils.js';

export interface ButtonProps
  extends BaseAtomProps,
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {
  children?: string | JSX.Element | JSX.Element[];
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'transparent';
  mode?: 'light' | 'dark';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  rounded?: boolean;
  glowing?: boolean;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  icon?: JSX.Element;
  onHoverArrow?: boolean;
  onHoverArrowDirection?: 'left' | 'right';
}

const sizeClasses = {
  xs: 'px-2 py-1.5 text-xs leading-[14px] !font-medium rounded-md',
  s: 'px-2.5 py-1.5 text-base leading-[19px] !font-medium rounded-md',
  m: 'px-3.5 py-3 text-lg leading-[21px] !font-medium rounded-lg',
  l: 'px-[18px] py-[14px] text-xl leading-[24px] !font-medium rounded-2xl',
  xl: 'px-12 py-3 text-xl !font-medium rounded-2xl',
};

const variantClasses = {
  primary:
    'bg-primary text-white shadow-button disabled:!bg-darkOrange-1 disabled:!text-darkOrange-3',
  secondary:
    'bg-secondary text-newBlack-1 shadow-button disabled:!bg-newGray-4 disabled:!text-newGray-2',
  outline:
    'bg-transparent text-darkOrange-5 border border-darkOrange-4 disabled:!text-newGray-3 disabled:!border-newGray-3',
  ghost:
    'text-white border border-newGray-2 hover:border-white transition-colors disabled:!text-newBlack-5 disabled:!border-newBlack-5',
  transparent: 'bg-white/30 text-white shadow-button',
};

const hoverArrowClasses =
  'opacity-0 max-w-0 inline-flex whitespace-nowrap transition-[max-width_opacity] overflow-hidden ease-in-out duration-150 group-hover:max-w-96 group-hover:opacity-100';

export const Button = ({
  children,
  variant,
  size = 'm',
  mode = 'dark',
  rounded,
  glowing,
  iconLeft,
  iconRight,
  onHoverArrow,
  onHoverArrowDirection = 'right',
  icon,
  className,
  disabled,
  ...buttonProps
}: ButtonProps) => {
  const classes = useMemo(
    () => [
      sizeClasses[size],
      variantClasses[variant],
      mode === 'dark' && 'dark',
      rounded ? '!rounded-full' : '',
      disabled ? 'cursor-default active:none' : 'active:scale-95',
    ],
    [rounded, size, variant, mode, disabled],
  );

  if (icon)
    return (
      <button
        disabled={disabled}
        className={cn(
          ...classes,
          'flex flex-row items-center transition-colors duration-150',
          className,
        )}
        {...buttonProps}
      >
        {icon}
      </button>
    );

  return (
    <button
      disabled={disabled}
      className={cn(
        ...classes,
        'flex flex-row items-center justify-center transition-colors duration-150',
        glowing ? 'shadow-md-button' : '',
        'group',
        className,
      )}
      {...buttonProps}
    >
      {onHoverArrow && onHoverArrowDirection === 'left' && (
        <FaArrowLeftLong
          className={cn(hoverArrowClasses, 'group-hover:mr-3')}
        />
      )}
      {iconLeft && <span className="mr-3">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-3">{iconRight}</span>}
      {onHoverArrow && onHoverArrowDirection === 'right' && (
        <FaArrowRightLong
          className={cn(hoverArrowClasses, 'group-hover:ml-3')}
        />
      )}
    </button>
  );
};
