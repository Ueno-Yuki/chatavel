'use client';

import React from 'react';
import { ModalState } from '@/hooks/useModal';

interface ModalStackProps {
  modals: ModalState[];
  onRestore: (id: string) => void;
  onClose: (id: string) => void;
}

export const ModalStack: React.FC<ModalStackProps> = ({
  modals,
  onRestore,
  onClose,
}) => {
  const minimizedModals = modals.filter(modal => modal.isMinimized);

  if (minimizedModals.length === 0) return null;

  return (
    <div className="modal-stack">
      {minimizedModals.map((modal, index) => (
        <div
          key={modal.id}
          className="modal-stack-item"
          onClick={() => onRestore(modal.id)}
          onContextMenu={(e) => {
            e.preventDefault();
            onClose(modal.id);
          }}
          title={`${modal.title} (右クリックで閉じる)`}
          style={{
            zIndex: 999 - index,
          }}
        >
          <div className="modal-stack-content">
            {modal.icon || (
              <span className="modal-stack-text">
                {modal.title.slice(0, 2)}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};