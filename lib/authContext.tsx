// @ts-ignore
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from './types';

interface AuthState {
  user: User | null;
  session: any | null;
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
  getLocalProfile: () => Promise<ProfileData | null>;
  updateLocalProfile: (data: ProfileData) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const API_URL = 'https://dev.bro-js.ru/ms/kfu-m-24-1/sber_mobile/auth';
const PROFILE_STORAGE_KEY = 'user_profile';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: false,
  });

  // Методы авторизации через backend
  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/sign-in`, { email, password });
      setState(prev => ({ ...prev, user: data.user, session: data.session }));
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || 'Ошибка входа');
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/sign-up`, { email, password });
      setState(prev => ({ ...prev, user: data.user, session: data.session }));
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || 'Ошибка регистрации');
    }
  };

  const signOut = async () => {
    try {
      await axios.post(`${API_URL}/sign-out`, { access_token: state.session?.access_token });
      setState({ user: null, session: null, loading: false });
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || 'Ошибка выхода');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await axios.post(`${API_URL}/reset-password`, { email });
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || 'Ошибка сброса пароля');
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      await axios.post(`${API_URL}/update-password`, { access_token: state.session?.access_token, newPassword });
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || 'Ошибка смены пароля');
    }
  };

  const getProfile = async (): Promise<ProfileData | null> => {
    if (!state.user) return null;
    try {
      const { data } = await axios.get(`${API_URL}/profile`, { params: { user_id: state.user.id } });
      return data;
    } catch (error: any) {
      return null;
    }
  };

  const updateProfile = async (data: ProfileData) => {
    if (!state.user) return;
    try {
      await axios.post(`${API_URL}/profile`, { user_id: state.user.id, data });
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || 'Ошибка обновления профиля');
    }
  };

  // --- Локальный профиль ---
  const loadLocalProfile = async (userId: string) => {
    try {
      const profileJson = await AsyncStorage.getItem(`${PROFILE_STORAGE_KEY}_${userId}`);
      if (profileJson) {
        return JSON.parse(profileJson);
      } else {
        // Если профиль не существует, создаём базовый
        const newProfile: ProfileData = {
          id: userId,
          username: state.user?.email?.split('@')[0] || 'Пользователь',
          updated_at: new Date().toISOString(),
        };
        await AsyncStorage.setItem(`${PROFILE_STORAGE_KEY}_${userId}`, JSON.stringify(newProfile));
        return newProfile;
      }
    } catch (error) {
      return null;
    }
  };

  const clearLocalProfile = async (userId: string) => {
    try {
      await AsyncStorage.removeItem(`${PROFILE_STORAGE_KEY}_${userId}`);
    } catch (error) {}
  };

  const getLocalProfile = async (): Promise<ProfileData | null> => {
    if (!state.user) return null;
    return await loadLocalProfile(state.user.id);
  };

  const updateLocalProfile = async (data: ProfileData) => {
    if (!state.user) return;
    const current = await loadLocalProfile(state.user.id) || {};
    const updated = { ...current, ...data, updated_at: new Date().toISOString() };
    await AsyncStorage.setItem(`${PROFILE_STORAGE_KEY}_${state.user.id}`, JSON.stringify(updated));
  };

  useEffect(() => {
    // Автоматическая авторизация при старте, если есть локальный профиль
    (async () => {
      if (!state.user) {
        // Получаем все ключи из AsyncStorage
        const keys = await AsyncStorage.getAllKeys();
        const profileKey = keys.find(k => k.startsWith(PROFILE_STORAGE_KEY));
        if (profileKey) {
          const profileJson = await AsyncStorage.getItem(profileKey);
          if (profileJson) {
            const profile = JSON.parse(profileJson);
            setState(prev => ({ ...prev, user: { id: profile.id, email: profile.username }, session: null }));
          }
        }
      }
    })();
  }, []);

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
        getLocalProfile,
        updateLocalProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 