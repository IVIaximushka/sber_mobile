import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

interface Props {
  mode: 'signIn' | 'signUp';
}

export const AuthSwitcher: React.FC<Props> = ({ mode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {mode === 'signIn' 
          ? 'Еще нет аккаунта?' 
          : 'Уже есть аккаунт?'
        }
      </Text>
      <Link 
        href={mode === 'signIn' ? '/(auth)/signup' : '/(auth)/signin'} 
        asChild
      >
        <TouchableOpacity>
          <Text style={styles.link}>
            {mode === 'signIn' 
              ? 'Зарегистрироваться' 
              : 'Войти'
            }
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    marginRight: 5,
  },
  link: {
    color: '#3498db',
    fontWeight: 'bold',
  },
}); 