import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { User, Chrome as Home, Bell, Shield, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../lib/authContext';
import { supabase } from '../../lib/supabase';

export default function ProfileScreen() {
  const { state } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Используем данные профиля из Supabase, если они доступны
  const userInfo = {
    name: state.user?.user_metadata?.username || 'Пользователь',
    apartment: '42',
    phone: '+7 (999) 123-45-67',
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <User size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.userName}>{userInfo.name}</Text>
        <Text style={styles.userApartment}>Квартира {userInfo.apartment}</Text>
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Настройки</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Home size={24} color="#007AFF" />
          <Text style={styles.menuText}>Данные о квартире</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Bell size={24} color="#007AFF" />
          <Text style={styles.menuText}>Уведомления</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Shield size={24} color="#007AFF" />
          <Text style={styles.menuText}>Безопасность</Text>
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
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userApartment: {
    fontSize: 16,
    color: '#8E8E93',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    marginLeft: 12,
  },
});