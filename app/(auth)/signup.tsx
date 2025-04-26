import React, { useCallback } from 'react';
import { View, StyleSheet, Image, ScrollView, BackHandler } from 'react-native';
import { AuthForm } from '../components/auth/AuthForm';
import { AuthSwitcher } from '../components/auth/AuthSwitcher';
import { SocialAuth } from '../components/auth/SocialAuth';
import { useFocusEffect, useRouter } from 'expo-router';
import { useNavigation } from '../../lib/navigationContext';

export default function SignUpScreen() {
  const router = useRouter();
  const customNavigation = useNavigation();
  
  // На экране регистрации кнопка "назад" возвращает на экран входа
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        const previousScreen = customNavigation.getPreviousScreen();
        if (previousScreen) {
          router.push(previousScreen);
        } else {
          router.push('/(auth)/signin');
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [router, customNavigation])
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <AuthForm mode="signUp" />
        <SocialAuth />
        <AuthSwitcher mode="signUp" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
}); 