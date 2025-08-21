'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, MoreHorizontal, Phone, Video, Camera, X } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      <div className="chat-header flex items-center justify-between p-lg border-b border-shadow-dark">
        <div className="flex items-center gap-md">
          <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center text-white font-semibold">
            旅
          </div>
          <div className="flex gap-md items-center">
            <h4 className="font-semibold text-primary">沖縄旅行</h4>
            <p className="text-sm text-secondary">3人のメンバー</p>
          </div>
        </div>
      </div>

      {/* メッセージエリア */}
      <div className="chat-messages p-md">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-wrapper mb-md flex ${
              message.sender === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`message-bubble max-w-xs md:max-w-sm px-md py-sm rounded-2xl ${
                message.sender === 'me'
                  ? 'neu-card rounded-br-md message-mine message-bubble-mine'
                  : 'neu-card text-primary rounded-bl-md message-bubble-other'
              }`}
            >
              {message.sender === 'other' && message.senderName && (
                <div className="sender-name text-xs text-secondary mb-xs font-medium">
                  {message.senderName}
                </div>
              )}
              <div className="message-text text-md leading-relaxed">
                {message.text}
              </div>
              <div
                className={`message-time text-xs mt-xs opacity-70
                  ${message.sender === 'other' ? 'text-secondary' : ''} `}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 入力エリア */}
      <div className="chat-input border-t border-shadow-dark p-md">
        <div className="flex gap-sm items-end">
          <button 
            className="neu-button neu-button-icon"
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={18} /> : <MoreHorizontal size={18} />}
          </button>
          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
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
        <div className={`modal-menu-items ${isMenuOpen ? 'visible' : ''} mt-xs`}>
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
      </div>
    </div>
  );
};