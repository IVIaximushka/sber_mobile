import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Send, Search } from 'lucide-react-native';
import { useState } from 'react';

const PRIMARY_COLOR = '#006D3B';

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
        <Search size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск в чате..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
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
    shadowColor: '#000',
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
});