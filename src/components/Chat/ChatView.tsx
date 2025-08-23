'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, MoreHorizontal, Phone, Video, Camera, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import Image from 'next/image';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
  senderName?: string;
  avatar?: string;
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    text: 'こんにちは！旅行の準備はどうですか？',
    sender: 'other',
    timestamp: new Date(Date.now() - 60000),
    senderName: '田中さん',
  },
  {
    id: '2',
    text: 'おつかれさまです！ホテルの予約完了しました🏨',
    sender: 'me',
    timestamp: new Date(Date.now() - 30000),
  },
  {
    id: '3',
    text: 'ありがとうございます！交通費の件ですが、新幹線で行きましょうか？',
    sender: 'other',
    timestamp: new Date(Date.now() - 15000),
    senderName: '田中さん',
  },
  {
    id: '4',
    text: 'いいですね！早割で予約してみます🚅',
    sender: 'me',
    timestamp: new Date(Date.now() - 5000),
  },
];

export const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [extensionContent, setExtensionContent] = useState<React.ReactNode>(null);
  const [isExtensionOpen, setIsExtensionOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // モバイルキーボード表示時の対応
  useEffect(() => {
    const handleResize = () => {
      if (isInputFocused && inputRef.current) {
        // キーボード表示時にインプットを画面内に保持
        setTimeout(() => {
          inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isInputFocused]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'me',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`${action} clicked`);
    setIsMenuOpen(false);
    
    // 拡張コンテンツの表示
    switch (action) {
      case 'photo':
        setExtensionContent(<PhotoSelector onSelectPhoto={handlePhotoSelect} onClose={closeExtension} />);
        setIsExtensionOpen(true);
        break;
      case 'voice-call':
        // 将来の音声通話UI
        console.log('音声通話機能は今後実装予定');
        break;
      case 'video-call':
        // 将来のビデオ通話UI
        console.log('ビデオ通話機能は今後実装予定');
        break;
    }
  };

  const handlePhotoSelect = (photo: File) => {
    // 写真選択時の処理
    console.log('Selected photo:', photo);
    // TODO: 実際の写真送信処理を実装
    setIsExtensionOpen(false);
    setExtensionContent(null);
  };

  const closeExtension = () => {
    setIsExtensionOpen(false);
    setExtensionContent(null);
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="chat-view">
      {/* チャットヘッダー */}
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-avatar">
            旅
          </div>
          <div className="chat-group-info">
            <h4 className="chat-group-name">沖縄旅行</h4>
            <p className="chat-member-count">3人のメンバー</p>
          </div>
        </div>
      </div>

      {/* メッセージエリア */}
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-wrapper ${
              message.sender === 'me' ? 'message-right' : 'message-left'
            }`}
          >
              {message.sender === 'me' && (
              <div className={`message-time time-right`}>
                {formatTime(message.timestamp)}
              </div>
              )}
            {message.sender === 'other' && message.senderName && (
              <div className="sender-name">
                {message.senderName}
              </div>
            )}
            <div
              className={`message-bubble ${
                message.sender === 'me'
                  ? 'message-mine message-bubble-mine'
                  : 'message-bubble-other'
              }`}
            >
              <div className="message-text">
                {message.text}
              </div>
            </div>
            {message.sender === 'other' && (
              <div className={`message-time time-left`}>
                {formatTime(message.timestamp)}
              </div>
              )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>


      {/* 入力エリア */}
      <div className="chat-input">
        <div className="chat-input-controls">
          <button 
            className="neu-button neu-button-icon"
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={18} /> : <MoreHorizontal size={18} />}
          </button>
          <div className="chat-input-wrapper">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="メッセージを入力..."
              className="chat-input-field"
            />
          </div>
          <Button
            variant="primary"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="send-button"
            aria-label="送信"
          >
            <Send size={18} />
          </Button>
        </div>
        
        {/* メニューアイテム */}
        <div className={`chat-menu-items ${isMenuOpen ? 'visible' : ''}`}>
          <div className="menu-item-wrapper">
            <button 
              aria-label="写真"
              onClick={() => handleMenuItemClick('photo')}
              className="menu-item-button"
            >
              <Camera size={20} />
            </button>
            <div className="menu-text">写真</div>
          </div>
          <div className="menu-item-wrapper">
            <button 
              aria-label="音声通話"
              onClick={() => handleMenuItemClick('voice-call')}
              className="menu-item-button"
            >
              <Phone size={20} />
            </button>
            <div className="menu-text">音声通話</div>
          </div>
          <div className="menu-item-wrapper">
            <button 
              aria-label="ビデオ通話"
              onClick={() => handleMenuItemClick('video-call')}
              className="menu-item-button"
            >
              <Video size={20} />
            </button>
            <div className="menu-text">ビデオ通話</div>
          </div>
        </div>
        {/* 拡張エリア（写真選択など） */}
        <div className={`chat-extension-area ${isExtensionOpen ? '' : 'collapsed'}`}>
          {extensionContent && (
            <div className="extension-content">
              <div className="extension-header">
                <h4 className="extension-title">コンテンツを選択</h4>
                <button
                  className="neu-button extension-close-button"
                  onClick={closeExtension}
                  aria-label="閉じる"
                >
                  <X size={16} />
                </button>
              </div>
              {extensionContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 写真選択コンポーネント
interface PhotoSelectorProps {
  onSelectPhoto: (photo: File) => void;
  onClose: () => void;
}

const PhotoSelector: React.FC<PhotoSelectorProps> = ({ onSelectPhoto, onClose }) => {
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setSelectedPhotos(prev => [...prev, ...imageFiles]);
  };

  const handlePhotoClick = (photo: File) => {
    onSelectPhoto(photo);
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="photo-selector">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        id="photo-input"
      />
      
      <label
        htmlFor="photo-input"
        className="photo-input-label neu-button"
      >
        <ImageIcon size={24} />
        <span>写真を選択</span>
      </label>

      {selectedPhotos.length > 0 && (
        <div className="photo-preview">
          {selectedPhotos.map((photo, index) => (
            <div key={index} className="photo-item">
              <Image 
                src={URL.createObjectURL(photo)} 
                alt={`選択された写真 ${index + 1}`}
                onClick={() => handlePhotoClick(photo)}
              />
              <div className="photo-overlay">
                <button
                  className="neu-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(index);
                  }}
                  aria-label="写真を削除"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPhotos.length === 0 && (
        <p className="photo-empty-state">
          写真を選択して送信できます
        </p>
      )}
    </div>
  );
};