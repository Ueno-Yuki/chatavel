'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'primary' | 'icon' | 'fab';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  'aria-label': ariaLabel,
}) => {
  const baseClasses = 'neu-button transition-all';
  const variantClasses = {
    default: 'neu-button-default',
    primary: 'neu-button-primary',
    icon: 'neu-button-icon',
    fab: 'neu-button-fab',
  };
  const sizeClasses = {
    sm: 'neu-button-sm',
    md: 'neu-button-md',
    lg: 'neu-button-lg',
  };

  const finalClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClasses}
      aria-label={ariaLabel}
    >
      {Icon && iconPosition === 'left' && (
        <Icon size={variant === 'icon' || variant === 'fab' ? 20 : 18} />
      )}
      {variant !== 'icon' && variant !== 'fab' && children}
      {Icon && iconPosition === 'right' && (
        <Icon size={18} />
      )}
    </button>
  );
};