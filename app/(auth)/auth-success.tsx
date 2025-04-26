import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, BackHandler } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../../lib/authContext';
import { Animated } from 'react-native';
import { useNavigation } from '../../lib/navigationContext';

export default function AuthSuccessScreen() {
  const router = useRouter();
  const customNavigation = useNavigation();
  const { state } = useAuth();
  const opacity = new Animated.Value(0);

  useEffect(() => {
    // Анимация появления
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // Перенаправление через 2 секунд
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  // Настраиваем обработку кнопки "назад"
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // После успешного входа кнопка "назад" ведет на главный экран
        router.replace('/(tabs)');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [router])
  );

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.successContainer}>
        <Image 
          source={require('../../assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcome}>Добро пожаловать!</Text>
        <Text style={styles.email}>{state.user?.email}</Text>
        <ActivityIndicator color="#3498db" style={styles.loader} size="large" />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2ecc71',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  }
}); 