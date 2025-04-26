import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Bell, ChevronLeft, AlertTriangle, Droplet, Zap, Home, Shield, Calendar } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useNavigation } from '../lib/navigationContext';

const PRIMARY_COLOR = '#8B1E3F'; // бургунди цвет

export default function NotificationsScreen() {
  const router = useRouter();
  const customNavigation = useNavigation();

  // Настраиваем обработку кнопки "назад"
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        const previousScreen = customNavigation.getPreviousScreen();
        if (previousScreen) {
          router.push(previousScreen);
        } else {
          router.push('/(tabs)');
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [router, customNavigation])
  );

  const notifications = [
    {
      id: '1',
      title: 'Проверка счетчиков',
      description: 'Завтра с 9:00 до 18:00 будет проводиться проверка счетчиков',
      date: 'Вчера',
      type: 'maintenance',
      icon: Home,
      color: PRIMARY_COLOR,
    },
    {
      id: '2',
      title: 'Собрание жильцов',
      description: 'Напоминание о собрании жильцов завтра в 19:00',
      date: '3 дня назад',
      type: 'meeting',
      icon: Calendar,
      color: PRIMARY_COLOR,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Уведомления</Text>
      </View>

      <ScrollView style={styles.content}>
        {notifications.map((notification) => (
          <TouchableOpacity key={notification.id} style={styles.notificationCard}>
            <View style={[styles.iconContainer, { backgroundColor: `${notification.color}20` }]}>
              <notification.icon size={24} color={notification.color} />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>{notification.description}</Text>
              <Text style={styles.notificationDate}>{notification.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: PRIMARY_COLOR,
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#5a2a37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  notificationDate: {
    fontSize: 12,
    color: PRIMARY_COLOR,
  },
}); 