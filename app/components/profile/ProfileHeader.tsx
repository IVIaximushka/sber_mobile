import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User, Edit } from 'lucide-react-native';

import { styles } from './ProfileStyles';
import { UserInfo } from './ProfileData';

interface ProfileHeaderProps {
  userInfo: UserInfo;
  onEditPress: () => void;
}

export function ProfileHeader({ userInfo, onEditPress }: ProfileHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.avatar}>
        <User size={40} color="#FFFFFF" />
      </View>
      <Text style={styles.avatarText}>{userInfo.name}</Text>
      <Text style={styles.userAddress}>Квартира {userInfo.apartment}</Text>
      
      <TouchableOpacity 
        style={styles.editButton} 
        onPress={onEditPress}
      >
        <Edit size={16} color="#FFFFFF" />
        <Text style={styles.editButtonText}>Редактировать</Text>
      </TouchableOpacity>
    </View>
  );
} 