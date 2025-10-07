import React from 'react';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  ...props
}) => {
  const baseStyles = 'relative font-medium rounded-full inline-flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden';
  
  const variantStyles = {
    primary: 'bg-primary dark:bg-dark-primary text-white dark:text-dark-background hover:bg-primary/90 dark:hover:bg-dark-primary/90',
    secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20 dark:bg-dark-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/20',
    outline: 'border border-primary dark:border-dark-primary text-primary dark:text-dark-primary hover:bg-primary/10 dark:hover:bg-dark-primary/10',
    ghost: 'text-primary hover:bg-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10',
    link: 'text-primary underline-offset-4 hover:underline dark:text-dark-primary p-0'
  };
  
  const sizeStyles = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-2.5 px-5'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        variant !== 'link' && sizeStyles[size],
        widthStyles,
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <div className="animate-spin h-4 w-4 rounded-full border-2 border-current border-t-transparent" />
        </div>
      )}
      
      <span className={cn(isLoading ? 'opacity-0' : 'opacity-100', 'flex items-center')}>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </span>
    </button>
  );
};