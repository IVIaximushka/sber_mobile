import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { User, Chrome as Home, Bell, Shield, LogOut, Edit } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../lib/authContext';
import { supabase } from '../../lib/supabase';

const PRIMARY_COLOR = '#8B1E3F';

interface ProfileData {
  username?: string;
  phone?: string;
  apartment?: string;
}

export default function ProfileScreen() {
  const { state, getProfile } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.avatarText}>{userInfo.name}</Text>
        <Text style={styles.userAddress}>Квартира {userInfo.apartment}</Text>
        
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => router.push('/profile/edit')}
        >
          <Edit size={16} color="#FFFFFF" />
          <Text style={styles.editButtonText}>Редактировать</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Контактная информация</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Телефон</Text>
          <Text style={styles.infoValue}>{userInfo.phone}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{userInfo.email}</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Настройки</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Home size={24} color={PRIMARY_COLOR} />
          <Text style={styles.menuItemTitle}>Данные о квартире</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Bell size={24} color={PRIMARY_COLOR} />
          <Text style={styles.menuItemTitle}>Уведомления</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Shield size={24} color={PRIMARY_COLOR} />
          <Text style={styles.menuItemTitle}>Безопасность</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} disabled={isLoggingOut}>
        {isLoggingOut ? (
          <ActivityIndicator color="#FF3B30" size="small" />
        ) : (
          <>
            <LogOut size={24} color="#FF3B30" />
            <Text style={styles.logoutText}>Выйти</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${PRIMARY_COLOR}`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  userAddress: {
    fontSize: 18,
    color: 'black',
    opacity: 0.8,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1A1A1A',
  },
  infoItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  menuSection: {
    backgroundColor: `${PRIMARY_COLOR}05`,
    padding: 16,
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#5a2a37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItemTitle: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#1A1A1A',
  },
  logoutButton: {
    margin: 16,
    backgroundColor: PRIMARY_COLOR,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: PRIMARY_COLOR,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});