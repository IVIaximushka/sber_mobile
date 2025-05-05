import React from 'react';
import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider, useAuth } from '@/lib/authContext';

function RootLayoutNav() {
  const { state } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useFrameworkReady();

  useEffect(() => {
    if (!state.loading) {
      const inAuthGroup = segments[0] === '(auth)';
      const isAuthSuccessScreen = segments.join('/').includes('auth-success');
      
      // Если пользователь не авторизован и не находится на страницах авторизации,
      // перенаправляем на страницу входа
      if (!state.user && !inAuthGroup) {
        router.replace('/(auth)/signin');
      }
      
      // Если пользователь авторизован и находится на странице входа или регистрации,
      // но не на странице успешной авторизации, перенаправляем его
      if (state.user && inAuthGroup && !isAuthSuccessScreen) {
        // Не перенаправляем автоматически - это теперь делается в AuthForm напрямую
        // Раньше перенаправляли через router.replace('/(auth)/auth-success');
      }
    }
  }, [state.user, state.loading, segments, router]);

  if (state.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <>
      <Slot />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
