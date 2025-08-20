import React from 'react';

// モーダル状態
export interface ModalState {
  id: string;                     // モーダルID
  title: string;                  // タイトル
  content: React.ReactNode;       // コンテンツ
  isMinimized: boolean;           // 最小化状態
  icon?: React.ReactNode;         // アイコン
  size?: ModalSize;               // サイズ
}

export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';

// 通知
export interface Notification {
  id: string;                     // 通知ID
  type: NotificationType;         // 通知タイプ
  title: string;                  // タイトル
  message: string;                // メッセージ
  icon?: string;                  // アイコン
  duration?: number;              // 表示時間（ms）
  createdAt: Date;                // 作成日時
  isRead: boolean;                // 既読フラグ
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'chat' | 'expense' | 'trip';

// フォーム状態
export interface FormState<T> {
  values: T;                      // フォーム値
  errors: Record<keyof T, string>; // エラー
  touched: Record<keyof T, boolean>; // タッチ状態
  isSubmitting: boolean;          // 送信中フラグ
  isValid: boolean;               // バリデーション状態
}

// ローディング状態
export interface LoadingState {
  isLoading: boolean;             // ローディング中
  message?: string;               // ローディングメッセージ
  progress?: number;              // 進捗（0-100）
}

// エラー状態
export interface ErrorState {
  hasError: boolean;              // エラー有無
  message: string;                // エラーメッセージ
  code?: string;                  // エラーコード
}