import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { AuthForm } from '@/app/components/auth/AuthForm';
import { AuthSwitcher } from '@/app/components/auth/AuthSwitcher';
import { SocialAuth } from '@/app/components/auth/SocialAuth';

export default function SignInScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <AuthForm mode="signIn" />
        <SocialAuth />
        <AuthSwitcher mode="signIn" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
}); 