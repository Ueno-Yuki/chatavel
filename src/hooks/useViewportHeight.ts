'use client';

import { useEffect } from 'react';

export const useViewportHeight = () => {
  useEffect(() => {
    const updateHeight = () => {
      // 実際のビューポート高さを取得（ツールバー考慮）
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // モーダル用の安全な高さも設定
      const safeHeight = window.innerHeight - 100; // 上下100pxの余裕
      document.documentElement.style.setProperty('--modal-safe-height', `${safeHeight}px`);
      
      // モバイル判定
      const isMobile = window.innerWidth <= 767;
      const mobileSafeHeight = window.innerHeight - (isMobile ? 60 : 100);
      document.documentElement.style.setProperty('--modal-mobile-safe-height', `${mobileSafeHeight}px`);
    };

    // 初期設定
    updateHeight();

    // リサイズ・向き変更時に更新
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    // iOS Safariのアドレスバー対応
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(updateHeight, 100);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // フォーカス時の調整（キーボード表示対応）
    const handleFocusIn = () => {
      setTimeout(updateHeight, 300);
    };
    const handleFocusOut = () => {
      setTimeout(updateHeight, 300);
    };
    
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);
};