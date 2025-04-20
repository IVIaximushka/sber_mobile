import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { LogOut } from 'lucide-react-native';

import { styles } from './ProfileStyles';

interface LogoutButtonProps {
  onLogout: () => void;
  isLoggingOut: boolean;
}

export function LogoutButton({ onLogout, isLoggingOut }: LogoutButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.logoutButton} 
      onPress={onLogout} 
      disabled={isLoggingOut}
    >
      {isLoggingOut ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <>
          <LogOut size={24} color="#FFFFFF" />
          <Text style={styles.logoutText}>Выйти</Text>
        </>
      )}
    </TouchableOpacity>
  );
} 