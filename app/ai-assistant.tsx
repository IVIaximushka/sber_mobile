import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ChevronLeft, Send, HelpCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useNavigation } from '../lib/navigationContext';

const PRIMARY_COLOR = '#8B1E3F';

export default function AIAssistantScreen() {
  const router = useRouter();
  const customNavigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Здравствуйте! Я ваш виртуальный помощник. Чем я могу вам помочь сегодня?',
      isAI: true,
      time: '10:00',
    },
  ]);

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

      // Имитация ответа ИИ
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          text: 'Я получил ваше сообщение. Чем еще могу помочь?',
          isAI: true,
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  // Обработчик нажатия кнопки назад в заголовке
  const handleBackPress = () => {
    const previousScreen = customNavigation.getPreviousScreen();
    if (previousScreen) {
      router.push(previousScreen);
    } else {
      router.push('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <HelpCircle size={24} color="#FFFFFF" />
          <Text style={styles.headerTitle}>Помощник</Text>
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