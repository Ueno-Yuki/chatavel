'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  pressed?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = true,
  pressed = false,
}) => {
  const baseClasses = 'neu-card transition-all';
  const interactiveClasses = onClick ? 'cursor-pointer active:neu-card-pressed' : '';
  const hoverClasses = hover && !pressed ? 'hover:neu-card-hover' : '';
  const pressedClasses = pressed ? 'neu-card-pressed' : '';

  const finalClasses = [
    baseClasses,
    interactiveClasses,
    hoverClasses,
    pressedClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={finalClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
};