import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Search, MessageCircle, HelpCircle, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AIAssistantScreen from '@/app/components/chat/ai-assistant';
import ChatScreen from '@/app/components/chat/[id]';

const PRIMARY_COLOR = '#8B1E3F';

// Типы для чатов
interface ChatItem {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
  unread: number;
  isAI?: boolean;
  icon: React.ComponentType<any>;
}

// Список чатов - компонент
const ChatList = ({ chats, onChatPress }: { chats: ChatItem[], onChatPress: (id: string) => void }) => {
  return (
    <ScrollView style={styles.messagesContainer}>
      {chats.map((chat) => (
        <TouchableOpacity 
          key={chat.id} 
          style={styles.chatItem}
          onPress={() => onChatPress(chat.id)}
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
  );
};

// Компонент поиска
const SearchBar = ({ value, onChangeText }: { value: string, onChangeText: (text: string) => void }) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Search size={20} color={PRIMARY_COLOR} />
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск чатов"
          placeholderTextColor="#8E8E93"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

export default function MainChatScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const chats: ChatItem[] = [
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
    setActiveChat(chatId);
  };

  const handleBackFromChat = () => {
    setActiveChat(null);
  };

  // Показывать чат с ассистентом, если это выбрано
  if (activeChat === '1') {
    return <AIAssistantScreen onBackPress={handleBackFromChat} />;
  }

  // Показывать выбранный чат
  if (activeChat) {
    return <ChatScreen chatId={activeChat} onBackPress={handleBackFromChat} />;
  }

  // Главный экран со списком чатов
  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <ChatList chats={filteredChats} onChatPress={handleChatPress} />
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