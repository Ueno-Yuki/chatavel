'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Minus } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onMinimize,
  title,
  children,
  className = '',
  size = 'medium',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'modal-small',
    medium: 'modal-medium',
    large: 'modal-large',
    fullscreen: 'modal-fullscreen',
  };

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal ${sizeClasses[size]} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <div className="modal-controls flex gap-sm">
            {onMinimize && (
              <button
                className="neu-button neu-button-icon"
                onClick={onMinimize}
                aria-label="最小化"
              >
                <Minus size={16} />
              </button>
            )}
            <button
              className="neu-button neu-button-icon"
              onClick={onClose}
              aria-label="閉じる"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};