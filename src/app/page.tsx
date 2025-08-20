'use client';

import React, { useState } from 'react';
import { MapPin, MessageCircle, Calculator, Camera, Users, Plane } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import { Modal } from '@/components/UI/Modal';
import { ModalStack } from '@/components/UI/ModalStack';
import { useModal } from '@/hooks/useModal';

export default function Home() {
  const { modals, openModal, closeModal, minimizeModal, restoreModal } = useModal();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'map',
      title: '地図機能',
      description: 'OpenStreetMapでおすすめスポットを表示',
      icon: MapPin,
      color: '#3498db',
    },
    {
      id: 'chat',
      title: 'リアルタイムチャット',
      description: '仲間とリアルタイムでコミュニケーション',
      icon: MessageCircle,
      color: '#2ecc71',
    },
    {
      id: 'expense',
      title: '費用管理',
      description: '自動割り勘計算で支出管理',
      icon: Calculator,
      color: '#e74c3c',
    },
    {
      id: 'photo',
      title: '写真アルバム',
      description: 'BGM付きスライドショー動画作成',
      icon: Camera,
      color: '#9b59b6',
    },
    {
      id: 'group',
      title: 'グループ管理',
      description: '旅行メンバーの管理と招待',
      icon: Users,
      color: '#f39c12',
    },
    {
      id: 'plan',
      title: '旅行プラン',
      description: '日程と予算の管理',
      icon: Plane,
      color: '#1abc9c',
    },
  ];

  const handleFeatureClick = (feature: typeof features[0]) => {
    openModal({
      id: feature.id,
      title: feature.title,
      content: (
        <div className="p-lg">
          <p className="text-lg text-secondary mb-md">
            {feature.description}
          </p>
          <p className="text-md">
            この機能は開発中です。完成をお楽しみに！
          </p>
        </div>
      ),
      icon: <feature.icon size={16} />,
      size: 'medium',
    });
  };

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* ヘッダー */}
      <header className="p-lg text-center">
        <h1 className="text-3xl font-bold text-primary mb-sm">
          Chatavel
        </h1>
        <p className="text-lg text-secondary">
          仲間と一緒にチャットしながら旅行計画
        </p>
      </header>

      {/* メインコンテンツ */}
      <main className="p-lg max-w-4xl mx-auto">
        {/* 機能カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-2xl">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="p-lg text-center cursor-pointer hover:transform hover:scale-105 transition-transform"
              onClick={() => handleFeatureClick(feature)}
            >
              <div
                className="w-16 h-16 mx-auto mb-md rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon 
                  size={32} 
                  style={{ color: feature.color }}
                />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-sm">
                {feature.title}
              </h3>
              <p className="text-sm text-secondary">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* デモセクション */}
        <Card className="p-2xl text-center">
          <h2 className="text-2xl font-bold text-primary mb-lg">
            モーダルスタック機能のデモ
          </h2>
          <p className="text-secondary mb-lg">
            複数の機能を同時に開いて、最小化してスタックできます。
          </p>
          <div className="flex flex-wrap gap-md justify-center">
            <Button
              variant="primary"
              onClick={() => handleFeatureClick(features[0])}
            >
              地図を開く
            </Button>
            <Button
              variant="default"
              onClick={() => handleFeatureClick(features[1])}
            >
              チャットを開く
            </Button>
            <Button
              variant="default"
              onClick={() => handleFeatureClick(features[2])}
            >
              費用管理を開く
            </Button>
          </div>
        </Card>
      </main>

      {/* モーダルとスタック */}
      {modals.map((modal) => (
        <Modal
          key={modal.id}
          isOpen={!modal.isMinimized}
          onClose={() => closeModal(modal.id)}
          onMinimize={() => minimizeModal(modal.id)}
          title={modal.title}
          size={modal.size}
        >
          {modal.content}
        </Modal>
      ))}

      <ModalStack
        modals={modals}
        onRestore={restoreModal}
        onClose={closeModal}
      />
    </div>
  );
}

// スタイルを追加
const styles = {
  '.grid': {
    display: 'grid',
  },
  '.grid-cols-1': {
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
  },
  '.md\\:grid-cols-2': {
    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
  '.lg\\:grid-cols-3': {
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    },
  },
  '.min-h-screen': {
    minHeight: '100vh',
  },
  '.max-w-4xl': {
    maxWidth: '56rem',
  },
  '.mx-auto': {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  '.font-bold': {
    fontWeight: '700',
  },
  '.font-semibold': {
    fontWeight: '600',
  },
};