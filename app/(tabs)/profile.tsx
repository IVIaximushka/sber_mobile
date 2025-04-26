import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator, Alert, BackHandler } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../../lib/authContext';
import { supabase } from '../../lib/supabase';
import { useNavigation } from '../../lib/navigationContext';

// Импорт компонентов профиля
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ContactInfo } from '../components/profile/ContactInfo';
import { SettingsMenu } from '../components/profile/SettingsMenu';
import { LogoutButton } from '../components/profile/LogoutButton';

// Импорт данных и стилей
import { styles } from '../components/profile/ProfileStyles';
import { ProfileData, PRIMARY_COLOR } from '../components/profile/ProfileData';

export default function ProfileScreen() {
  const { state, getProfile } = useAuth();
  const router = useRouter();
  const customNavigation = useNavigation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [loading, setLoading] = useState(true);

  // Настраиваем обработчик кнопки "назад"
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        const previousScreen = customNavigation.getPreviousScreen();
        if (previousScreen) {
          router.push(previousScreen);
        } else {
          // Выход из приложения на главном экране
          BackHandler.exitApp();
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [router, customNavigation])
  );

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile();
        if (profile) {
          setProfileData({
            username: profile.username,
            phone: profile.phone,
            apartment: profile.apartment
          });
        }
      } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [getProfile]);

  // Используем данные профиля из Supabase, если они доступны
  const userInfo = {
    name: profileData.username || state.user?.user_metadata?.username || 'Пользователь',
    apartment: profileData.apartment || '—',
    phone: profileData.phone || '—',
    email: state.user?.email || 'Нет данных',
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Выход из аккаунта через Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      // Перенаправление на экран входа
      router.replace('/(auth)/signin');
    } catch (error) {
      Alert.alert('Ошибка', (error as Error).message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleEditPress = () => {
    router.push('/profile/edit');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader 
        userInfo={userInfo} 
        onEditPress={handleEditPress} 
      />
      
      <ContactInfo userInfo={userInfo} />
      
      <SettingsMenu />
      
      <LogoutButton 
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />
    </ScrollView>
  );
}