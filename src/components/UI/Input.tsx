'use client';

import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  'aria-label'?: string;
  id?: string;
  name?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder,
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  className = '',
  required = false,
  disabled = false,
  readOnly = false,
  'aria-label': ariaLabel,
  id,
  name,
}, ref) => {
  const baseClasses = 'neu-input transition-all';
  const finalClasses = [
    baseClasses,
    disabled && 'disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      className={finalClasses}
      aria-label={ariaLabel}
    />
  );
});

Input.displayName = 'Input';