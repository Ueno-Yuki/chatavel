'use client';

import React, { useState } from 'react';
import { Users, UserPlus, Settings, Crown, Shield, X, Copy, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';

interface GroupMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
  isOnline: boolean;
}

const mockMembers: GroupMember[] = [
  {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    role: 'owner',
    joinedAt: new Date(2024, 0, 1),
    isOnline: true,
  },
  {
    id: '2',
    name: '佐藤花子',
    email: 'sato@example.com',
    role: 'admin',
    joinedAt: new Date(2024, 0, 15),
    isOnline: true,
  },
  {
    id: '3',
    name: '山田次郎',
    email: 'yamada@example.com',
    role: 'member',
    joinedAt: new Date(2024, 1, 1),
    isOnline: false,
  },
];

interface GroupManagementViewProps {
  groupName: string;
  groupId: string;
}

export const GroupManagementView: React.FC<GroupManagementViewProps> = ({
  groupName,
  groupId,
}) => {
  const [members, setMembers] = useState<GroupMember[]>(mockMembers);
  const [activeTab, setActiveTab] = useState<'members' | 'settings' | 'invite'>('members');
  const [inviteEmail, setInviteEmail] = useState('');
  const [groupSettings, setGroupSettings] = useState({
    name: groupName,
    description: '沖縄旅行のグループです',
    isPublic: false,
    allowMemberInvite: true,
  });

  const handleRemoveMember = (memberId: string) => {
    setMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const handleRoleChange = (memberId: string, newRole: 'admin' | 'member') => {
    setMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ));
  };

  const handleInviteByEmail = () => {
    if (inviteEmail.trim()) {
      console.log('Inviting:', inviteEmail);
      setInviteEmail('');
      // TODO: 実際の招待処理を実装
    }
  };

  const copyInviteLink = () => {
    const inviteLink = `https://chatavel.app/join/${groupId}`;
    navigator.clipboard.writeText(inviteLink);
    // TODO: トースト通知を表示
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown size={16} className="text-yellow-500" />;
      case 'admin':
        return <Shield size={16} className="text-blue-500" />;
      default:
        return <Users size={16} className="text-gray-500" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'owner':
        return 'オーナー';
      case 'admin':
        return '管理者';
      default:
        return 'メンバー';
    }
  };

  return (
    <div className="group-management-view">
      {/* タブナビゲーション */}
      <div className="tab-navigation mb-md">
        <div className="flex border-b border-shadow-dark">
          <button
            onClick={() => setActiveTab('members')}
            className={`tab-button ${activeTab === 'members' ? 'active' : ''}`}
          >
            <Users size={18} />
            <span>メンバー</span>
          </button>
          <button
            onClick={() => setActiveTab('invite')}
            className={`tab-button ${activeTab === 'invite' ? 'active' : ''}`}
          >
            <UserPlus size={18} />
            <span>招待</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          >
            <Settings size={18} />
            <span>設定</span>
          </button>
        </div>
      </div>

      {/* メンバータブ */}
      {activeTab === 'members' && (
        <div className="members-tab">
          <div className="members-header mb-md">
            <h3 className="text-lg font-semibold text-primary">
              メンバー ({members.length})
            </h3>
          </div>

          <div className="members-list space-y-sm">
            {members.map((member) => (
              <div key={member.id} className="member-item neu-card p-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    {/* アバター */}
                    <div className="member-avatar">
                      <div className="w-12 h-12 rounded-full bg-accent-gradient flex items-center justify-center text-white font-semibold">
                        {member.name.charAt(0)}
                      </div>
                      {member.isOnline && (
                        <div className="online-indicator"></div>
                      )}
                    </div>

                    {/* メンバー情報 */}
                    <div className="member-info">
                      <div className="flex items-center gap-xs mb-xs">
                        <h4 className="font-semibold text-primary">{member.name}</h4>
                        {getRoleIcon(member.role)}
                      </div>
                      <p className="text-sm text-secondary">{member.email}</p>
                      <p className="text-xs text-light">
                        {member.joinedAt.toLocaleDateString('ja-JP')} に参加
                      </p>
                    </div>
                  </div>

                  {/* アクション */}
                  {member.role !== 'owner' && (
                    <div className="member-actions flex gap-xs">
                      <select
                        value={member.role}
                        onChange={(e) => handleRoleChange(member.id, e.target.value as 'admin' | 'member')}
                        className="role-select neu-input text-sm"
                      >
                        <option value="member">メンバー</option>
                        <option value="admin">管理者</option>
                      </select>
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="neu-button neu-button-icon danger-btn"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {member.role === 'owner' && (
                    <span className="owner-badge text-xs font-medium">
                      {getRoleLabel(member.role)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 招待タブ */}
      {activeTab === 'invite' && (
        <div className="invite-tab">
          <div className="invite-section mb-lg">
            <h3 className="text-lg font-semibold text-primary mb-md">メンバーを招待</h3>
            
            {/* メールで招待 */}
            <div className="invite-by-email neu-card p-md mb-md">
              <h4 className="font-semibold text-primary mb-sm flex items-center gap-xs">
                <Mail size={18} />
                メールアドレスで招待
              </h4>
              <div className="flex gap-sm">
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="primary"
                  onClick={handleInviteByEmail}
                  disabled={!inviteEmail.trim()}
                >
                  招待送信
                </Button>
              </div>
            </div>

            {/* 招待リンク */}
            <div className="invite-link neu-card p-md">
              <h4 className="font-semibold text-primary mb-sm flex items-center gap-xs">
                <Copy size={18} />
                招待リンク
              </h4>
              <p className="text-sm text-secondary mb-sm">
                このリンクを共有して、メンバーをグループに招待できます
              </p>
              <div className="flex gap-sm">
                <Input
                  value={`https://chatavel.app/join/${groupId}`}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="default"
                  onClick={copyInviteLink}
                >
                  <Copy size={16} />
                  コピー
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 設定タブ */}
      {activeTab === 'settings' && (
        <div className="settings-tab">
          <h3 className="text-lg font-semibold text-primary mb-md">グループ設定</h3>
          
          <div className="settings-form space-y-md">
            {/* グループ名 */}
            <div className="setting-item neu-card p-md">
              <label className="block text-sm font-medium text-primary mb-xs">
                グループ名
              </label>
              <Input
                value={groupSettings.name}
                onChange={(e) => setGroupSettings(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            {/* 説明 */}
            <div className="setting-item neu-card p-md">
              <label className="block text-sm font-medium text-primary mb-xs">
                グループ説明
              </label>
              <textarea
                value={groupSettings.description}
                onChange={(e) => setGroupSettings(prev => ({ ...prev, description: e.target.value }))}
                className="neu-input w-full h-20 resize-none"
                placeholder="グループの説明を入力..."
              />
            </div>

            {/* 権限設定 */}
            <div className="setting-item neu-card p-md">
              <h4 className="font-semibold text-primary mb-sm">権限設定</h4>
              
              <div className="setting-option mb-sm">
                <label className="flex items-center gap-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={groupSettings.allowMemberInvite}
                    onChange={(e) => setGroupSettings(prev => ({ 
                      ...prev, 
                      allowMemberInvite: e.target.checked 
                    }))}
                    className="neu-checkbox"
                  />
                  <span className="text-sm text-primary">
                    メンバーが他のユーザーを招待できる
                  </span>
                </label>
              </div>

              <div className="setting-option">
                <label className="flex items-center gap-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={groupSettings.isPublic}
                    onChange={(e) => setGroupSettings(prev => ({ 
                      ...prev, 
                      isPublic: e.target.checked 
                    }))}
                    className="neu-checkbox"
                  />
                  <span className="text-sm text-primary">
                    パブリックグループにする
                  </span>
                </label>
                <p className="text-xs text-secondary mt-xs ml-lg">
                  パブリックグループは検索結果に表示され、誰でも参加申請できます
                </p>
              </div>
            </div>

            {/* 危険な操作 */}
            <div className="setting-item neu-card p-md border border-red-200">
              <h4 className="font-semibold text-red-600 mb-sm">危険な操作</h4>
              <p className="text-sm text-secondary mb-md">
                以下の操作は取り消せません。慎重に実行してください。
              </p>
              <div className="flex gap-sm">
                <Button variant="default" size="sm" className="danger-btn">
                  グループを削除
                </Button>
                <Button variant="default" size="sm" className="warning-btn">
                  グループを退出
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};