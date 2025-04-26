import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, BackHandler } from 'react-native';
import { useAuth } from '../../lib/authContext';
import { Link, useRouter, useFocusEffect } from 'expo-router';
import { useNavigation } from '../../lib/navigationContext';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();
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
          router.push('/(auth)/signin');
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [router, customNavigation])
  );

  const handleResetPassword = async () => {
    if (email.trim() === '') {
      Alert.alert('Ошибка', 'Пожалуйста, введите email');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (error) {
      Alert.alert('Ошибка', (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Инструкции отправлены</Text>
        <Text style={styles.description}>
          Мы отправили инструкции по сбросу пароля на ваш email. Пожалуйста, проверьте вашу почту.
        </Text>
        <Link href="/(auth)/signin" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Вернуться к авторизации</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Восстановление пароля</Text>
      <Text style={styles.description}>
        Введите ваш email, и мы отправим вам инструкции по сбросу пароля.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleResetPassword}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Сбросить пароль</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Вспомнили пароль?</Text>
        <Link href="/(auth)/signin" asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Войти</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    marginRight: 5,
  },
  link: {
    color: '#3498db',
    fontWeight: 'bold',
  },
}); 