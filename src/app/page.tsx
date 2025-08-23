'use client';

import React from 'react';
import { MapPin, MessageCircle, Calculator, Camera, Users, Plane } from 'lucide-react';
import { Modal } from '@/components/UI/Modal';
import { ModalStack } from '@/components/UI/ModalStack';
import { useModal } from '@/hooks/useModal';
import { ChatView } from '@/components/Chat/ChatView';
import { GroupManagementView } from '@/components/Group/GroupManagementView';
import '@/styles/components/homepage.scss';

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
        <div className="dev-message">
          <p className="dev-message-description">
            {feature.description}
          </p>
          <p className="dev-message-text">
            この機能は開発中です。完成をお楽しみに！
          </p>
        </div>
      ),
      icon: <feature.icon size={16} />,
      size: 'medium',
    });
  };

  return (
    <div className="homepage">
      {/* ヘッダー */}
      <header className="homepage-header">
        <h1 className="homepage-title">
          Chatavel
        </h1>
        <p className="homepage-subtitle">
          仲間と一緒にチャットしながら旅行計画
        </p>
      </header>

      {/* メインコンテンツ */}
      <main className="homepage-main">
        {/* 機能カード */}
        <div className="features-grid">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="feature-card"
              onClick={() => handleFeatureClick(feature)}
            >
              <div className="feature-card-content">
                <div
                  className="feature-icon"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon 
                    size={20}
                    style={{ color: feature.color }}
                  />
                </div>
                <h3 className="feature-title">
                  {feature.title}
                </h3>
                <p className="feature-description">
                  {feature.description}
                </p>
              </div>
            </div>
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