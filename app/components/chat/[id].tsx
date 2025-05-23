import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ChevronLeft, Send, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const PRIMARY_COLOR = '#8B1E3F';

// Имитация базы данных чатов
const chatData = {
  '1': {
    title: 'Управляющая компания',
    messages: [
      {
        id: '1',
        text: 'Добрый день! Чем могу помочь?',
        isAI: true,
        time: '10:00',
      },
    ],
  },
  '2': {
    title: 'Техподдержка',
    messages: [
      {
        id: '1',
        text: 'Здравствуйте! Как я могу вам помочь?',
        isAI: true,
        time: '09:30',
      },
    ],
  },
  '3': {
    title: 'Соседи',
    messages: [
      {
        id: '1',
        text: 'Привет всем! Кто-нибудь знает, когда будет уборка подъезда?',
        isAI: false,
        time: '11:15',
      },
    ],
  },
};

interface ChatScreenProps {
  chatId: string;
  onBackPress: () => void;
}

export default function ChatScreen({ chatId, onBackPress }: ChatScreenProps) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chatData[chatId as keyof typeof chatData]?.messages || []);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        isAI: false,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Имитация ответа
      setTimeout(() => {
        const response = {
          id: (Date.now() + 1).toString(),
          text: 'Спасибо за сообщение! Мы обязательно рассмотрим ваш вопрос.',
          isAI: true,
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBackPress}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <User size={24} color="#FFFFFF" />
          <Text style={styles.headerTitle}>{chatData[chatId as keyof typeof chatData]?.title || 'Чат'}</Text>
        </View>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.messageBubble,
              msg.isAI ? styles.aiMessage : styles.userMessage
            ]}>
            <Text style={[
              styles.messageText,
              msg.isAI ? styles.aiMessageText : styles.userMessageText
            ]}>
              {msg.text}
            </Text>
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
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 16,
  },
  aiMessage: {
    backgroundColor: `${PRIMARY_COLOR}10`,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: PRIMARY_COLOR,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  aiMessageText: {
    color: '#1A1A1A',
  },
  userMessageText: {
    color: '#FFFFFF',
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