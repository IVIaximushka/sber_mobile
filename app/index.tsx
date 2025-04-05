import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../lib/authContext';

export default function HomeScreen() {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Сразу перенаправляем на вкладки при загрузке этой страницы
    if (state.user && !state.loading) {
      router.replace('/(tabs)');
    }
  }, [state.user, state.loading, router]);

  // Показываем индикатор загрузки вместо содержимого страницы
  return (
    <View style={styles.loadingContainer}>
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
  }
}); 