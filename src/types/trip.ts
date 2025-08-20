import { SupportedCurrency } from './user';

export interface Trip {
  id: string;                     // ドキュメントID
  title: string;                  // 旅行タイトル
  description?: string;           // 説明
  destination: Destination;       // 目的地情報
  startDate: Date;                // 開始日
  endDate: Date;                  // 終了日
  budget: Budget;                 // 予算情報
  createdBy: string;              // 作成者UID
  participants: Participant[];    // 参加者情報
  status: TripStatus;             // 旅行ステータス
  visibility: TripVisibility;     // 公開設定
  tags: string[];                 // タグ
  createdAt: Date;                // 作成日時
  updatedAt: Date;                // 更新日時
}

export interface Destination {
  name: string;                   // 目的地名
  country: string;                // 国
  city: string;                   // 都市
  coordinates?: Coordinates;      // 座標
  timezone: string;               // タイムゾーン
}

export interface Coordinates {
  lat: number;                    // 緯度
  lng: number;                    // 経度
}

export interface Budget {
  total: number;                  // 総予算
  currency: SupportedCurrency;   // 通貨
  perPerson?: number;             // 一人当たり予算
  categories: BudgetCategory[];   // カテゴリ別予算
}

export interface BudgetCategory {
  name: string;                   // カテゴリ名
  amount: number;                 // 予算額
  spent: number;                  // 使用額
  color: string;                  // 表示色
}

export interface Participant {
  uid: string;                    // ユーザーUID
  displayName: string;            // 表示名
  photoURL?: string;              // プロフィール画像
  role: ParticipantRole;          // 役割
  joinedAt: Date;                 // 参加日時
  status: ParticipantStatus;      // 参加状態
}

export type TripStatus = 'planning' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled';
export type TripVisibility = 'public' | 'private' | 'friends';
export type ParticipantRole = 'owner' | 'admin' | 'member';
export type ParticipantStatus = 'invited' | 'joined' | 'declined' | 'left';

// 旅行作成/更新用
export interface TripCreateInput {
  title: string;
  description?: string;
  destination: Omit<Destination, 'coordinates' | 'timezone'>;
  startDate: Date;
  endDate: Date;
  budget: Omit<Budget, 'categories'>;
  visibility: TripVisibility;
  tags?: string[];
}

export interface TripUpdateInput extends Partial<TripCreateInput> {
  id: string;
}