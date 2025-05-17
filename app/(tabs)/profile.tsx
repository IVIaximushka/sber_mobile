import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/lib/authContext';

// Импорт компонентов профиля
import { ProfileHeader } from '@/app/components/profile/ProfileHeader';
import { ContactInfo } from '@/app/components/profile/ContactInfo';
import { SettingsMenu } from '@/app/components/profile/SettingsMenu';
import { LogoutButton } from '@/app/components/profile/LogoutButton';
import EditProfileScreen from '@/app/components/profile/edit';

// Импорт данных и стилей
import { styles } from '@/app/components/profile/ProfileStyles';
import { ProfileData, PRIMARY_COLOR } from '@/app/components/profile/ProfileData';

export default function ProfileScreen() {
  const { state, getProfile, signOut } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

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
      await signOut();
      router.replace('/(auth)/signin');
    } catch (error) {
      Alert.alert('Ошибка', (error as Error).message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleEditPress = () => {
    setIsEditMode(true);
  };
  
  const handleBackFromEdit = () => {
    setIsEditMode(false);
    // После возврата из режима редактирования, обновляем данные профиля
    loadProfile();
  };
  
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
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>
    );
  }
  
  // Рендерим экран редактирования, если активен режим редактирования
  if (isEditMode) {
    return <EditProfileScreen onBackPress={handleBackFromEdit} />;
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