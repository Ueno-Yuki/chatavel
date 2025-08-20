// ユーザー関連
export * from './user';

// 旅行関連
export * from './trip';

// チャット関連
export * from './chat';

// 費用関連
export * from './expense';

// 写真関連
export * from './photo';

// 地図関連
export * from './map';

// UI関連
export * from './ui';

// 共通ユーティリティ型
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;

// ID型
export type EntityId = string;
export type UserId = string;
export type TripId = string;
export type MessageId = string;
export type ExpenseId = string;
export type PhotoId = string;

// 日付型
export type Timestamp = Date;
export type DateString = string; // YYYY-MM-DD format
export type TimeString = string; // HH:mm format
export type DateTimeString = string; // ISO 8601 format