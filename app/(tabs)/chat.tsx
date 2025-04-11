import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Send, Search } from 'lucide-react-native';
import { useState } from 'react';

const PRIMARY_COLOR = '#8B1E3F';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const messages = [
    {
      id: 1,
      sender: 'Анна Иванова',
      text: 'Добрый день! Кто-нибудь знает хорошего мастера по ремонту стиральных машин?',
      time: '10:30',
      apartment: '42',
    },
    {
      id: 2,
      sender: 'Петр Сидоров',
      text: 'Да, могу порекомендовать. Недавно вызывал мастера через приложение, очень качественно все сделал.',
      time: '10:32',
      apartment: '56',
    },
    {
      id: 3,
      sender: 'Мария Петрова',
      text: 'Присоединяюсь к рекомендации. Тоже пользовалась его услугами.',
      time: '10:35',
      apartment: '23',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={PRIMARY_COLOR} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск чатов"
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View key={msg.id} style={styles.messageCard}>
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>{msg.sender}</Text>
              <Text style={styles.apartmentNumber}>кв. {msg.apartment}</Text>
            </View>
            <Text style={styles.messageText}>{msg.text}</Text>
            <Text style={styles.messageTime}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Написать сообщение..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton}>
          <Send size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
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
    padding: 16,
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#5a2a37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  apartmentNumber: {
    fontSize: 14,
    color: '#8E8E93',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
    color: '#1A1A1A',
  },
  messageTime: {
    fontSize: 12,
    color: '#8E8E93',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 16,
    color: '#1A1A1A',
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${PRIMARY_COLOR}10`,
    backgroundColor: '#FFFFFF',
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
});