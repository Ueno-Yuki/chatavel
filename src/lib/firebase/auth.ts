import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  updateProfile,
  User as FirebaseUser,
  onAuthStateChanged,
  NextOrObserver,
  Unsubscribe
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import { User, UserProfileUpdate } from '@/types';

// Google認証プロバイダー
const googleProvider = new GoogleAuthProvider();

// 認証関数
export const authService = {
  // メール・パスワードでサインアップ
  async signUp(email: string, password: string, displayName: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // プロフィール更新
    await updateProfile(firebaseUser, { displayName });

    // Firestoreにユーザー情報を保存
    const userData: Omit<User, 'uid'> = {
      email: firebaseUser.email!,
      displayName,
      photoURL: firebaseUser.photoURL || undefined,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      isOnline: true,
      preferences: {
        notifications: {
          pushNotifications: true,
          emailNotifications: true,
          chatNotifications: true,
          expenseNotifications: true,
          tripUpdates: true,
        },
        privacy: {
          profileVisibility: 'friends',
          locationSharing: true,
          onlineStatus: true,
        },
        display: {
          theme: 'auto',
          fontSize: 'medium',
          currency: 'JPY',
          dateFormat: 'YYYY/MM/DD',
          timeFormat: '24h',
        },
        language: 'ja',
      },
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), {
      ...userData,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    });

    return { uid: firebaseUser.uid, ...userData };
  },

  // メール・パスワードでサインイン
  async signIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // 最終ログイン時間を更新
    await updateDoc(doc(db, 'users', firebaseUser.uid), {
      lastLoginAt: serverTimestamp(),
      isOnline: true,
    });

    return await this.getUser(firebaseUser.uid);
  },

  // Googleでサインイン
  async signInWithGoogle(): Promise<User> {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const firebaseUser = userCredential.user;

    // 初回ログインかチェック
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (!userDoc.exists()) {
      // 新規ユーザーの場合、Firestoreに情報を保存
      const userData: Omit<User, 'uid'> = {
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || 'ユーザー',
        photoURL: firebaseUser.photoURL || undefined,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isOnline: true,
        preferences: {
          notifications: {
            pushNotifications: true,
            emailNotifications: true,
            chatNotifications: true,
            expenseNotifications: true,
            tripUpdates: true,
          },
          privacy: {
            profileVisibility: 'friends',
            locationSharing: true,
            onlineStatus: true,
          },
          display: {
            theme: 'auto',
            fontSize: 'medium',
            currency: 'JPY',
            dateFormat: 'YYYY/MM/DD',
            timeFormat: '24h',
          },
          language: 'ja',
        },
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        ...userData,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });

      return { uid: firebaseUser.uid, ...userData };
    } else {
      // 既存ユーザーの場合、最終ログイン時間を更新
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        lastLoginAt: serverTimestamp(),
        isOnline: true,
      });

      return await this.getUser(firebaseUser.uid);
    }
  },

  // 匿名サインイン
  async signInAnonymously(): Promise<User> {
    const userCredential = await signInAnonymously(auth);
    const firebaseUser = userCredential.user;

    const userData: Omit<User, 'uid'> = {
      email: '',
      displayName: 'ゲスト',
      isOnline: true,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      preferences: {
        notifications: {
          pushNotifications: false,
          emailNotifications: false,
          chatNotifications: true,
          expenseNotifications: true,
          tripUpdates: true,
        },
        privacy: {
          profileVisibility: 'private',
          locationSharing: false,
          onlineStatus: false,
        },
        display: {
          theme: 'auto',
          fontSize: 'medium',
          currency: 'JPY',
          dateFormat: 'YYYY/MM/DD',
          timeFormat: '24h',
        },
        language: 'ja',
      },
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), {
      ...userData,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    });

    return { uid: firebaseUser.uid, ...userData };
  },

  // サインアウト
  async signOut(): Promise<void> {
    const user = auth.currentUser;
    if (user) {
      // オフライン状態に更新
      await updateDoc(doc(db, 'users', user.uid), {
        isOnline: false,
      });
    }
    await signOut(auth);
  },

  // ユーザー情報取得
  async getUser(uid: string): Promise<User> {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) {
      throw new Error('ユーザーが見つかりません');
    }

    const userData = userDoc.data();
    return {
      uid,
      email: userData.email,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      phoneNumber: userData.phoneNumber,
      createdAt: userData.createdAt?.toDate() || new Date(),
      lastLoginAt: userData.lastLoginAt?.toDate() || new Date(),
      isOnline: userData.isOnline,
      preferences: userData.preferences,
    };
  },

  // プロフィール更新
  async updateProfile(uid: string, updates: UserProfileUpdate): Promise<void> {
    const firebaseUser = auth.currentUser;
    
    // Firebase Authのプロフィール更新
    if (firebaseUser && (updates.displayName || updates.photoURL)) {
      await updateProfile(firebaseUser, {
        displayName: updates.displayName,
        photoURL: updates.photoURL,
      });
    }

    // Firestoreの更新
    const updateData: Record<string, unknown> = {};
    if (updates.displayName) updateData.displayName = updates.displayName;
    if (updates.photoURL) updateData.photoURL = updates.photoURL;
    if (updates.phoneNumber) updateData.phoneNumber = updates.phoneNumber;
    if (updates.preferences) updateData.preferences = updates.preferences;

    await updateDoc(doc(db, 'users', uid), updateData);
  },

  // 認証状態の監視
  onAuthStateChanged(callback: NextOrObserver<FirebaseUser>): Unsubscribe {
    return onAuthStateChanged(auth, callback);
  },

  // 現在のユーザー取得
  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  },
};