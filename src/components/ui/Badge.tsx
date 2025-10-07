import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const variantClasses = {
    default: 'bg-surface text-text-secondary dark:bg-dark-surface/80 dark:text-dark-text-secondary',
    primary: 'bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary',
    secondary: 'bg-secondary/20 text-primary dark:bg-dark-primary/20 dark:text-dark-primary',
    success: 'bg-success/10 text-success dark:bg-dark-success/10 dark:text-dark-success',
    outline: 'border border-border text-text-secondary dark:border-dark-border dark:text-dark-text-secondary',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};