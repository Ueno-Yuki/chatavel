export interface ChatMessage {
  id: string;                     // メッセージID
  tripId: string;                 // 旅行ID
  senderId: string;               // 送信者UID
  senderName: string;             // 送信者名
  senderAvatar?: string;          // 送信者アバター
  content: MessageContent;        // メッセージ内容
  type: MessageType;              // メッセージタイプ
  replyTo?: string;               // 返信先メッセージID
  mentions?: string[];            // メンション対象UID
  reactions: MessageReaction[];   // リアクション
  isEdited: boolean;              // 編集済みフラグ
  isDeleted: boolean;             // 削除済みフラグ
  timestamp: Date;                // 送信日時
  editedAt?: Date;                // 編集日時
}

export type MessageType = 
  | 'text'           // テキスト
  | 'image'          // 画像
  | 'location'       // 位置情報
  | 'file'           // ファイル
  | 'system'         // システムメッセージ
  | 'expense'        // 費用共有
  | 'itinerary';     // 行程共有

export interface MessageContent {
  text?: string;                  // テキスト内容
  imageUrl?: string;              // 画像URL
  imageThumbnail?: string;        // サムネイルURL
  fileUrl?: string;               // ファイルURL
  fileName?: string;              // ファイル名
  fileSize?: number;              // ファイルサイズ
  location?: LocationMessage;     // 位置情報
  expense?: ExpenseMessage;       // 費用情報
}

export interface LocationMessage {
  lat: number;                    // 緯度
  lng: number;                    // 経度
  address?: string;               // 住所
  placeName?: string;             // 場所名
}

export interface ExpenseMessage {
  expenseId: string;              // 費用ID
  amount: number;                 // 金額
  description: string;            // 説明
  category: string;               // カテゴリ
}

export interface MessageReaction {
  emoji: string;                  // 絵文字
  users: string[];                // リアクションしたユーザーUID
  count: number;                  // カウント
}

// チャット状態管理
export interface ChatState {
  messages: ChatMessage[];        // メッセージリスト
  isLoading: boolean;             // ローディング状態
  hasMore: boolean;               // さらに読み込み可能か
  error: string | null;           // エラー
  typingUsers: TypingUser[];      // 入力中ユーザー
}

export interface TypingUser {
  uid: string;                    // ユーザーUID
  displayName: string;            // 表示名
  startedAt: Date;                // 入力開始時刻
}

// メッセージ送信用
export interface MessageSendInput {
  tripId: string;
  content: MessageContent;
  type: MessageType;
  replyTo?: string;
  mentions?: string[];
}