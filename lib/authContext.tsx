import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from './supabase';
import { AuthState, User } from './types';
import { Session, Provider } from '@supabase/supabase-js';

interface AuthContextProps {
  state: AuthState;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  verifyOtp: (email: string, token: string) => Promise<void>;
  signInWithProvider: (provider: Provider) => Promise<void>;
  updateProfile: (data: { username?: string, avatar_url?: string }) => Promise<void>;
  getProfile: () => Promise<any>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    // Проверка текущей сессии
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(prev => ({ 
        ...prev, 
        session,
        user: session?.user || null,
        loading: false
      }));
    });

    // Подписка на изменения аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setState(prev => ({ 
          ...prev, 
          session,
          user: session?.user || null,
          loading: false
        }));
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true }));
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setState(prev => ({ ...prev, loading: false }));
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true }));
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setState(prev => ({ ...prev, loading: false }));
    if (error) throw error;
  };

  const signOut = async () => {
    setState(prev => ({ ...prev, loading: true }));
    const { error } = await supabase.auth.signOut();
    setState(prev => ({ ...prev, loading: false }));
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    setState(prev => ({ ...prev, loading: true }));
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'myapp://reset-password',
    });
    setState(prev => ({ ...prev, loading: false }));
    if (error) throw error;
  };

  const updatePassword = async (password: string) => {
    setState(prev => ({ ...prev, loading: true }));
    const { error } = await supabase.auth.updateUser({
      password,
    });
    setState(prev => ({ ...prev, loading: false }));
    if (error) throw error;
  };

  const verifyOtp = async (email: string, token: string) => {
    setState(prev => ({ ...prev, loading: true }));
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    setState(prev => ({ ...prev, loading: false }));
    if (error) throw error;
  };

  const signInWithProvider = async (provider: Provider) => {
    setState(prev => ({ ...prev, loading: true }));
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: 'myapp://auth/callback',
      },
    });
    setState(prev => ({ ...prev, loading: false }));
    if (error) throw error;
  };

  const updateProfile = async (data: { username?: string, avatar_url?: string }) => {
    if (!state.user) throw new Error('Пользователь не аутентифицирован');

    setState(prev => ({ ...prev, loading: true }));
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: state.user.id,
        updated_at: new Date().toISOString(),
        ...data,
      });
    setState(prev => ({ ...prev, loading: false }));
    if (error) throw error;
  };

  const getProfile = async () => {
    if (!state.user) throw new Error('Пользователь не аутентифицирован');

    setState(prev => ({ ...prev, loading: true }));
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', state.user.id)
      .single();
    setState(prev => ({ ...prev, loading: false }));
    if (error) throw error;
    return data;
  };

  return (
    <AuthContext.Provider value={{ 
      state, 
      signUp, 
      signIn, 
      signOut, 
      resetPassword, 
      updatePassword, 
      verifyOtp,
      signInWithProvider,
      updateProfile,
      getProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 