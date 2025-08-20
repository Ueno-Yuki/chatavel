import { SupportedCurrency } from './user';
import { Coordinates } from './trip';

export interface Expense {
  id: string;                     // 費用ID
  tripId: string;                 // 旅行ID
  title: string;                  // 費用タイトル
  amount: number;                 // 金額
  currency: SupportedCurrency;   // 通貨
  category: ExpenseCategory;      // カテゴリ
  description?: string;           // 説明
  paidBy: string;                 // 支払者UID
  paidByName: string;             // 支払者名
  splitType: SplitType;           // 分割方法
  splitBetween: ExpenseSplit[];   // 分割詳細
  receiptUrl?: string;            // レシート画像URL
  location?: ExpenseLocation;     // 支払い場所
  tags: string[];                 // タグ
  date: Date;                     // 支払い日
  createdAt: Date;                // 作成日時
  updatedAt: Date;                // 更新日時
  createdBy: string;              // 作成者UID
}

export type ExpenseCategory = 
  | 'transport'      // 交通費
  | 'accommodation'  // 宿泊費
  | 'food'          // 飲食費
  | 'activity'      // アクティビティ
  | 'shopping'      // ショッピング
  | 'other';        // その他

export type SplitType = 
  | 'equal'         // 均等割り
  | 'custom'        // カスタム
  | 'percentage'    // パーセンテージ
  | 'by_share';     // シェア数

export interface ExpenseSplit {
  userId: string;                 // ユーザーUID
  userName: string;               // ユーザー名
  amount: number;                 // 負担額
  percentage?: number;            // 負担割合
  shares?: number;                // シェア数
  isPaid: boolean;                // 支払い済みフラグ
}

export interface ExpenseLocation {
  name?: string;                  // 場所名
  address?: string;               // 住所
  coordinates?: Coordinates;      // 座標
  category?: string;              // 場所カテゴリ
}

// 費用作成/更新用
export interface ExpenseCreateInput {
  tripId: string;
  title: string;
  amount: number;
  currency: SupportedCurrency;
  category: ExpenseCategory;
  description?: string;
  paidBy: string;
  splitType: SplitType;
  splitBetween: Omit<ExpenseSplit, 'isPaid'>[];
  location?: ExpenseLocation;
  tags?: string[];
  date: Date;
  receiptUrl?: string;
}

export interface ExpenseUpdateInput extends Partial<ExpenseCreateInput> {
  id: string;
}