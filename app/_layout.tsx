import React from 'react';
import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider, useAuth } from '../lib/authContext';

function RootLayoutNav() {
  const { state } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useFrameworkReady();

  useEffect(() => {
    if (!state.loading) {
      const inAuthGroup = segments[0] === '(auth)';
      
      if (state.user && inAuthGroup) {
        // Если пользователь авторизован и находится на страницах авторизации,
        // перенаправляем сразу на вкладки, а не на главную
        router.replace('/(tabs)');
      } else if (!state.user && !inAuthGroup) {
        // Если пользователь не авторизован и не находится на страницах авторизации,
        // перенаправляем на страницу входа
        router.replace('/(auth)/signin');
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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
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
