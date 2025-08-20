export interface Photo {
  id: string;                     // 写真ID
  tripId: string;                 // 旅行ID
  url: string;                    // 画像URL
  thumbnailUrl?: string;          // サムネイルURL
  filename: string;               // ファイル名
  fileSize: number;               // ファイルサイズ
  caption?: string;               // キャプション
  uploadedBy: string;             // アップロード者UID
  uploadedByName: string;         // アップロード者名
  uploadedAt: Date;               // アップロード日時
  takenAt?: Date;                 // 撮影日時
  location?: PhotoLocation;       // 撮影場所
  tags: string[];                 // タグ
  likes: PhotoLike[];             // いいね
  isPublic: boolean;              // 公開設定
}

export interface PhotoLocation {
  lat: number;                    // 緯度
  lng: number;                    // 経度
  address?: string;               // 住所
  placeName?: string;             // 場所名
}

export interface PhotoLike {
  userId: string;                 // ユーザーUID
  userName: string;               // ユーザー名
  likedAt: Date;                  // いいね日時
}

// 写真アップロード用
export interface PhotoUploadInput {
  tripId: string;
  file: File;
  caption?: string;
  tags?: string[];
  location?: PhotoLocation;
}

// 写真更新用
export interface PhotoUpdateInput {
  id: string;
  caption?: string;
  tags?: string[];
  location?: PhotoLocation;
  isPublic?: boolean;
}