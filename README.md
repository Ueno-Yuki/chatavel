# 🧳 Chatavel (Chat + Travel)

**モバイルファースト** × **ニューモーフィズムデザイン** の旅行予定アプリ

## 🛠️ 技術スタック

- **フロントエンド**: Next.js 14 + TypeScript
- **UI**: 独自CSS（ニューモーフィズム）+ Sass
- **アイコン**: Lucide React
- **アニメーション**: Framer Motion + React Spring
- **データベース**: Firebase Firestore
- **認証**: Firebase Authentication
- **ストレージ**: Firebase Storage
- **地図**: OpenStreetMap + Leaflet
- **デプロイ**: Vercel

## 📦 セットアップ

```bash
# 1. 環境変数設定
cp .env.local.example .env.local
# Firebase設定を.env.localに記入

# 2. 開発サーバー起動
npm run dev
```

## 📂 プロジェクト構造

```
chatavel/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/            # React コンポーネント
│   │   ├── UI/               # 基本UIコンポーネント
│   │   ├── Map/              # 地図関連コンポーネント
│   │   ├── Chat/             # チャット機能
│   │   ├── PhotoAlbum/       # 写真アルバム
│   │   ├── ExpenseTracker/   # 費用管理
│   │   ├── Auth/             # 認証関連
│   │   └── Modals/           # モーダルコンテンツ
│   ├── hooks/                # カスタムフック
│   ├── lib/                  # ユーティリティライブラリ
│   │   ├── firebase/         # Firebase設定
│   │   ├── osm/             # OpenStreetMap API
│   │   └── utils/           # その他ユーティリティ
│   ├── styles/              # スタイルシート
│   ├── types/               # TypeScript型定義
│   └── store/               # 状態管理
├── public/
│   ├── icons/               # PWAアイコン
│   ├── images/              # 画像アセット
│   └── manifest.json        # PWA manifest
├── scripts/                 # ユーティリティスクリプト
├── docs/                    # ドキュメント
└── pages/api/               # API Routes
```

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run type-check

# リント
npm run lint
```
