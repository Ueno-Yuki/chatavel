'use client';

import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
  id?: string;
  name?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  required = false,
  disabled = false,
  'aria-label': ariaLabel,
  id,
  name,
}) => {
  const baseClasses = 'neu-input transition-all';
  const finalClasses = [
    baseClasses,
    disabled && 'disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={finalClasses}
      aria-label={ariaLabel}
    />
  );
};