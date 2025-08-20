'use client';

import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { authService } from '@/lib/firebase/auth';
import { User, AuthState } from '@/types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        if (firebaseUser) {
          // Firebase Userからアプリ用のUserオブジェクトを取得
          const user = await authService.getUser(firebaseUser.uid);
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        } else {
          // ログアウト状態
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('認証エラー:', error);
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: error instanceof Error ? error.message : '認証エラーが発生しました',
        });
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await authService.signIn(email, password);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'ログインに失敗しました';
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: errorMessage 
      }));
      return false;
    }
  };

  const signUp = async (email: string, password: string, displayName: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await authService.signUp(email, password, displayName);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'アカウント作成に失敗しました';
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: errorMessage 
      }));
      return false;
    }
  };

  const signInWithGoogle = async (): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await authService.signInWithGoogle();
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Googleログインに失敗しました';
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: errorMessage 
      }));
      return false;
    }
  };

  const signInAnonymously = async (): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await authService.signInAnonymously();
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'ゲストログインに失敗しました';
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: errorMessage 
      }));
      return false;
    }
  };

  const signOut = async (): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await authService.signOut();
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'ログアウトに失敗しました';
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: errorMessage 
      }));
      return false;
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!authState.user) return false;

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await authService.updateProfile(authState.user.uid, updates);
      // 更新後のユーザー情報を取得
      const updatedUser = await authService.getUser(authState.user.uid);
      setAuthState(prev => ({ 
        ...prev, 
        user: updatedUser,
        isLoading: false 
      }));
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'プロフィール更新に失敗しました';
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: errorMessage 
      }));
      return false;
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    ...authState,
    signIn,
    signUp,
    signInWithGoogle,
    signInAnonymously,
    signOut,
    updateProfile,
    clearError,
  };
};