import { useState, useCallback } from 'react';
import React from 'react';

export interface ModalState {
  id: string;
  title: string;
  content: React.ReactNode;
  isMinimized: boolean;
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
}

export const useModal = () => {
  const [modals, setModals] = useState<ModalState[]>([]);

  const openModal = useCallback((modal: Omit<ModalState, 'isMinimized'>) => {
    setModals(prev => {
      const existingIndex = prev.findIndex(m => m.id === modal.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], isMinimized: false };
        return updated;
      }
      return [...prev, { ...modal, isMinimized: false }];
    });
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals(prev => prev.filter(modal => modal.id !== id));
  }, []);

  const minimizeModal = useCallback((id: string) => {
    setModals(prev => prev.map(modal => 
      modal.id === id ? { ...modal, isMinimized: true } : modal
    ));
  }, []);

  const restoreModal = useCallback((id: string) => {
    setModals(prev => prev.map(modal => 
      modal.id === id ? { ...modal, isMinimized: false } : modal
    ));
  }, []);

  const clearAllModals = useCallback(() => {
    setModals([]);
  }, []);

  return {
    modals,
    openModal,
    closeModal,
    minimizeModal,
    restoreModal,
    clearAllModals,
  };
};