import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '../../lib/authContext';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';

interface ProfileData {
  id: string;
  username?: string;
  avatar_url?: string;
  phone?: string;
  apartment?: string;
  updated_at?: string;
}

export default function EditProfileScreen() {
  const { state, updateProfile, getProfile } = useAuth();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [apartment, setApartment] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile();
        if (profile) {
          setUsername(profile.username || '');
          setPhone(profile.phone || '');
          setApartment(profile.apartment || '');
        }
      } catch (error) {
        Alert.alert('Ошибка', (error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [getProfile]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({
        username,
        phone,
        apartment
      });
      Alert.alert('Успех', 'Профиль успешно обновлен');
      router.replace('/(tabs)/profile');
    } catch (error) {
      Alert.alert('Ошибка', (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Редактировать профиль</Text>

          <View style={styles.avatarContainer}>
            <Image
              source={
                state.user?.user_metadata?.avatar_url
                  ? { uri: state.user.user_metadata.avatar_url }
                  : require('../../assets/images/icon.png')
              }
              style={styles.avatar}
            />
          </View>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={state.user?.email || ''}
            editable={false}
          />

          <Text style={styles.label}>Имя пользователя</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите имя пользователя"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Номер телефона</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите номер телефона"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Номер квартиры</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите номер квартиры"
            value={apartment}
            onChangeText={setApartment}
            keyboardType="number-pad"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.saveButton]} 
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Сохранить</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
  },
  saveButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 