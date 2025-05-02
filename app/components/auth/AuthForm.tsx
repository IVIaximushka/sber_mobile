import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { supabase } from '@/lib/supabase';
import { Link, useRouter } from 'expo-router';

interface Props {
  mode: 'signIn' | 'signUp';
}

const AuthForm: React.FC<Props> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'signIn') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        // После успешного входа явно перенаправляем на экран успешной авторизации
        router.push('/(auth)/auth-success');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        Alert.alert(
          'Регистрация успешна', 
          'Ваш аккаунт успешно создан, выполняется вход в систему.'
        );
        
        // После успешной регистрации выполняем вход
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) throw signInError;
        
        // После успешного входа явно перенаправляем на экран успешной авторизации
        router.push('/(auth)/auth-success');
      }
    } catch (error) {
      Alert.alert('Ошибка', (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === 'signIn' ? 'Вход в аккаунт' : 'Создание аккаунта'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {mode === 'signIn' && (
        <Link href="/(auth)/reset-password" asChild>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Забыли пароль?</Text>
          </TouchableOpacity>
        </Link>
      )}

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>
            {mode === 'signIn' ? 'Войти' : 'Зарегистрироваться'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  forgotPassword: {
    color: '#3498db',
    textAlign: 'right',
    marginBottom: 15,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export { AuthForm };
export default AuthForm; 