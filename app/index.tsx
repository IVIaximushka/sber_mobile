import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../lib/authContext';

export default function HomeScreen() {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Небольшая задержка перед перенаправлением, чтобы избежать ошибок навигации
    const timer = setTimeout(() => {
      if (state.user && !state.loading) {
        router.replace('/(tabs)');
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [state.user, state.loading, router]);

  // Показываем индикатор загрузки вместо содержимого страницы
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Загрузка приложения...</Text>
      <ActivityIndicator size="large" color="#3498db" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginBottom: 20,
    fontSize: 16,
    color: '#666'
  }
}); 