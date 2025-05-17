import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SocialAuth = () => {
  const handleGoogleSignIn = async () => {
    try {
      Alert.alert('Информация', 'Вход через Google временно не доступен');
    } catch (error) {
      Alert.alert('Ошибка', (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>или</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
        <Ionicons name="logo-google" size={24} color="#DB4437" />
        <Text style={styles.socialButtonText}>Войти через Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e1e1e1',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    marginTop: 10,
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export { SocialAuth };
export default SocialAuth; 