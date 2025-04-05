import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from './supabase';
import { Session, User } from '@supabase/supabase-js';
import { Alert } from 'react-native';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

interface AuthContextProps {
  state: AuthState;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  getProfile: () => Promise<any>;
  updateProfile: (data: { username?: string; avatar_url?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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

  const getProfile = async () => {
    try {
      if (!state.user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', state.user.id)
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error: any) {
      console.error('Ошибка при получении профиля:', error.message);
      return null;
    }
  };

  const updateProfile = async (data: { username?: string; avatar_url?: string }) => {
    try {
      if (!state.user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('profiles')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', state.user.id);
      
      if (error) throw error;
    } catch (error: any) {
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