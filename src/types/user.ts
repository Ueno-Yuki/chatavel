export interface User {
  uid: string;                    // Firebase UID
  email: string;                  // メールアドレス
  displayName: string;            // 表示名
  photoURL?: string;              // プロフィール画像URL
  phoneNumber?: string;           // 電話番号
  createdAt: Date;                // 作成日時
  lastLoginAt: Date;              // 最終ログイン
  isOnline: boolean;              // オンライン状態
  preferences: UserPreferences;   // ユーザー設定
}

export interface UserPreferences {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  display: DisplaySettings;
  language: SupportedLanguage;
}

export interface NotificationSettings {
  pushNotifications: boolean;     // プッシュ通知
  emailNotifications: boolean;    // メール通知
  chatNotifications: boolean;     // チャット通知
  expenseNotifications: boolean;  // 費用通知
  tripUpdates: boolean;           // 旅行更新通知
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  locationSharing: boolean;       // 位置情報共有
  onlineStatus: boolean;          // オンライン状態表示
}

export interface DisplaySettings {
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  currency: SupportedCurrency;
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY/MM/DD';
  timeFormat: '12h' | '24h';
}

export type SupportedLanguage = 'ja' | 'en' | 'ko' | 'zh';
export type SupportedCurrency = 'JPY' | 'USD' | 'EUR' | 'KRW' | 'CNY';

// ユーザープロフィール更新用
export interface UserProfileUpdate {
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  preferences?: Partial<UserPreferences>;
}

// 認証状態
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}