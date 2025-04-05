import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

// Создаем хранилище на основе SecureStore вместо AsyncStorage
const customStorage = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

// Используем реальные URL и ключи Supabase
const supabaseUrl = 'https://bmlyukvdtegczcksvpaq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbHl1a3ZkdGVnY3pja3N2cGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNjQxMzMsImV4cCI6MjA1ODk0MDEzM30.Ks932QA0zz6p6gXTX9qFJvYe5ZW9NyrNQE5Yw5RQqH4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: customStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Автоматическое обновление сессии
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
}); 