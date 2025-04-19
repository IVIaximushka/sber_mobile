// @ts-ignore
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from './supabase';
import { Session, User } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

interface ProfileData {
  id?: string;
  username?: string;
  avatar_url?: string;
  phone?: string;
  apartment?: string;
  updated_at?: string;
}

interface AuthContextProps {
  state: AuthState;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  getProfile: () => Promise<ProfileData | null>;
  updateProfile: (data: ProfileData) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Ключ для хранения профиля в AsyncStorage
const PROFILE_STORAGE_KEY = 'user_profile';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    // Получить текущую сессию при загрузке
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(prev => ({ 
        ...prev, 
        session,
        user: session?.user || null,
        loading: false,
      }));

      // При входе пользователя загружаем его профиль из локального хранилища
      if (session?.user) {
        loadLocalProfile(session.user.id);
      }
    });

    // Установить слушатель изменений состояния аутентификации
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setState(prev => ({ 
          ...prev, 
          session,
          user: session?.user || null,
          loading: false,
        }));

        // При изменении состояния аутентификации
        if (event === 'SIGNED_IN' && session?.user) {
          loadLocalProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          // При выходе очищаем локальный профиль
          clearLocalProfile();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Загрузка профиля из локального хранилища
  const loadLocalProfile = async (userId: string) => {
    try {
      const profileJson = await AsyncStorage.getItem(`${PROFILE_STORAGE_KEY}_${userId}`);
      
      if (profileJson) {
        console.log('Профиль загружен из локального хранилища');
      } else {
        // Если профиль не существует, создаем пустой
        const newProfile: ProfileData = {
          id: userId,
          username: state.user?.email?.split('@')[0] || 'Пользователь',
          updated_at: new Date().toISOString(),
        };
        
        await AsyncStorage.setItem(`${PROFILE_STORAGE_KEY}_${userId}`, JSON.stringify(newProfile));
        console.log('Создан новый локальный профиль');
      }
    } catch (error) {
      console.error('Ошибка при загрузке локального профиля:', error);
    }
  };

  // Очистка локального профиля при выходе
  const clearLocalProfile = async () => {
    try {
      if (state.user?.id) {
        await AsyncStorage.removeItem(`${PROFILE_STORAGE_KEY}_${state.user.id}`);
        console.log('Локальный профиль очищен');
      }
    } catch (error) {
      console.error('Ошибка при очистке локального профиля:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
    } catch (error: any) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
    } catch (error: any) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Очищаем локальный профиль перед выходом
      await clearLocalProfile();
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error: any) {
      throw error;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
    } catch (error: any) {
      throw error;
    }
  };

  // Получение профиля из локального хранилища
  const getProfile = async (): Promise<ProfileData | null> => {
    try {
      if (!state.user) throw new Error('User not authenticated');
      
      const profileJson = await AsyncStorage.getItem(`${PROFILE_STORAGE_KEY}_${state.user.id}`);
      
      if (profileJson) {
        return JSON.parse(profileJson) as ProfileData;
      }
      
      // Если профиль не найден, создаем базовый профиль
      const newProfile: ProfileData = {
        id: state.user.id,
        username: state.user.email?.split('@')[0] || 'Пользователь',
        updated_at: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem(`${PROFILE_STORAGE_KEY}_${state.user.id}`, JSON.stringify(newProfile));
      return newProfile;
      
    } catch (error: any) {
      console.error('Ошибка при получении профиля:', error.message);
      Alert.alert('Ошибка', `Не удалось загрузить профиль: ${error.message}`);
      return null;
    }
  };

  // Обновление профиля в локальном хранилище
  const updateProfile = async (data: ProfileData) => {
    try {
      if (!state.user) throw new Error('User not authenticated');
      
      console.log('Обновление локального профиля:', data);
      
      // Получаем текущий профиль
      const profileJson = await AsyncStorage.getItem(`${PROFILE_STORAGE_KEY}_${state.user.id}`);
      let currentProfile: ProfileData = profileJson 
        ? JSON.parse(profileJson) 
        : { id: state.user.id };
      
      // Обновляем данные профиля
      const updatedProfile: ProfileData = {
        ...currentProfile,
        ...data,
        updated_at: new Date().toISOString(),
      };
      
      // Сохраняем обновленный профиль
      await AsyncStorage.setItem(
        `${PROFILE_STORAGE_KEY}_${state.user.id}`, 
        JSON.stringify(updatedProfile)
      );
      
      console.log('Профиль успешно обновлен локально');
      
    } catch (error: any) {
      console.error('Ошибка при обновлении профиля:', error);
      Alert.alert('Ошибка', `Не удалось обновить профиль: ${error.message}`);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        getProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 