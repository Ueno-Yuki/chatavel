'use client';

import React from 'react';
import { useViewportHeight } from '@/hooks/useViewportHeight';

interface ViewportProviderProps {
  children: React.ReactNode;
}

export const ViewportProvider: React.FC<ViewportProviderProps> = ({ children }) => {
  useViewportHeight();
  
  return <>{children}</>;
};