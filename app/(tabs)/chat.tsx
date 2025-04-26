import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Search, MessageCircle, HelpCircle, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useNavigation } from '../../lib/navigationContext';

const PRIMARY_COLOR = '#8B1E3F';

export default function ChatScreen() {
  const router = useRouter();
  const customNavigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const chats = [
    {
      id: '1',
      title: 'Помощник',
      lastMessage: 'Чем я могу вам помочь сегодня?',
      time: 'Сейчас',
      unread: 0,
      isAI: true,
      icon: HelpCircle,
    },
    {
      id: '2',
      title: 'Техническая поддержка',
      lastMessage: 'Мы проверили ваш интернет, все в порядке',
      time: '2 дня назад',
      unread: 0,
      icon: MessageCircle,
    },
    {
      id: '3',
      title: 'Соседи',
      lastMessage: 'Привет всем! Кто-нибудь знает, когда будет уборка подъезда?',
      time: 'Вчера',
      unread: 2,
      icon: Users,
    },
  ];

  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatPress = (chatId: string) => {
    if (chatId === '1') {
      router.push('/ai-assistant');
    } else {
      router.push(`/chat/${chatId}`);
    }
  };

  // Настраиваем обработку кнопки "назад"
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        const previousScreen = customNavigation.getPreviousScreen();
        if (previousScreen) {
          router.push(previousScreen);
        } else {
          BackHandler.exitApp();
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [router, customNavigation])
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={PRIMARY_COLOR} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск чатов"
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {filteredChats.map((chat) => (
          <TouchableOpacity 
            key={chat.id} 
            style={styles.chatItem}
            onPress={() => handleChatPress(chat.id)}
          >
            <View style={[styles.chatIconContainer, { backgroundColor: chat.isAI ? `${PRIMARY_COLOR}20` : PRIMARY_COLOR }]}>
              <chat.icon size={24} color={chat.isAI ? PRIMARY_COLOR : '#FFFFFF'} />
            </View>
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatTitle}>{chat.title}</Text>
                <Text style={styles.chatTime}>{chat.time}</Text>
              </View>
              <Text style={styles.chatMessage} numberOfLines={1}>
                {chat.lastMessage}
              </Text>
            </View>
            {chat.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{chat.unread}</Text>
              </View>
            )}
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
    paddingTop: 60,
  },
  searchContainer: {
    backgroundColor: `${PRIMARY_COLOR}10`,
    padding: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#5a2a37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: '#1A1A1A',
  },
  messagesContainer: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${PRIMARY_COLOR}10`,
    backgroundColor: '#FFFFFF',
  },
  chatIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  chatTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  chatMessage: {
    fontSize: 14,
    color: '#8E8E93',
  },
  unreadBadge: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});