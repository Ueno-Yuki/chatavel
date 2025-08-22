'use client';

import React from 'react';
import { MapPin, MessageCircle, Calculator, Camera, Users, Plane } from 'lucide-react';
import { Card } from '@/components/UI/Card';
import { Modal } from '@/components/UI/Modal';
import { ModalStack } from '@/components/UI/ModalStack';
import { useModal } from '@/hooks/useModal';
import { ChatView } from '@/components/Chat/ChatView';
import { GroupManagementView } from '@/components/Group/GroupManagementView';

export default function Home() {
  const { modals, openModal, closeModal, minimizeModal, restoreModal } = useModal();

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
      title: 'チャット',
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
    // チャット機能の場合は専用コンテンツを表示
    if (feature.id === 'chat') {
      openModal({
        id: feature.id,
        title: feature.title,
        content: <ChatView />,
        icon: <feature.icon size={16} />,
        size: 'large',
      });
      return;
    }

    // グループ管理機能の場合は専用コンテンツを表示
    if (feature.id === 'group') {
      openModal({
        id: feature.id,
        title: feature.title,
        content: <GroupManagementView groupName="沖縄旅行" groupId="okinawa-trip-2024" />,
        icon: <feature.icon size={16} />,
        size: 'large',
      });
      return;
    }

    // その他の機能は開発中メッセージを表示
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
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-md md:gap-lg mb-2xl">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="p-md md:p-lg text-center cursor-pointer hover:transform hover:scale-105 transition-transform"
              onClick={() => handleFeatureClick(feature)}
            >
              <div
                className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-sm md:mb-md rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon 
                  size={20}
                  className="md:scale-150"
                  style={{ color: feature.color }}
                />
              </div>
              <h3 className="text-md md:text-lg font-semibold text-primary mb-xs md:mb-sm">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-secondary">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
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