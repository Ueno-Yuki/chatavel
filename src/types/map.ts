import { Coordinates } from './trip';

export interface MapPlace {
  id: string;                     // 場所ID
  name: string;                   // 場所名
  lat: number;                    // 緯度
  lng: number;                    // 経度
  type: PlaceType;                // 場所タイプ
  category: PlaceCategory;        // カテゴリ
  address?: string;               // 住所
  description?: string;           // 説明
  rating?: number;                // 評価（1-5）
  openingHours?: string;          // 営業時間
  website?: string;               // ウェブサイト
  phone?: string;                 // 電話番号
  amenities: string[];            // 設備・サービス
}

export type PlaceType = 
  | 'restaurant'     // レストラン
  | 'cafe'          // カフェ
  | 'attraction'    // 観光地
  | 'hotel'         // ホテル
  | 'transport'     // 交通機関
  | 'shopping'      // ショッピング
  | 'smoking'       // 喫煙所
  | 'other';        // その他

export type PlaceCategory = 
  | 'food_drink'    // 飲食
  | 'tourism'       // 観光
  | 'accommodation' // 宿泊
  | 'transport'     // 交通
  | 'shopping'      // ショッピング
  | 'smoking'       // 喫煙
  | 'other';        // その他

// 地図検索
export interface MapSearchQuery {
  query: string;                  // 検索キーワード
  location: Coordinates;          // 検索中心地点
  radius: number;                 // 検索半径（メートル）
  types?: PlaceType[];            // 場所タイプフィルター
  categories?: PlaceCategory[];   // カテゴリフィルター
  openNow?: boolean;              // 営業中のみ
  rating?: number;                // 最低評価
}

export interface MapSearchResult {
  places: MapPlace[];             // 検索結果
  totalCount: number;             // 総件数
  hasMore: boolean;               // さらに読み込み可能か
  query: MapSearchQuery;          // 検索クエリ
}