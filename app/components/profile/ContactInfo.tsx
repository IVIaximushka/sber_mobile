import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './ProfileStyles';
import { UserInfo } from './ProfileData';

interface ContactInfoProps {
  userInfo: UserInfo;
}

export function ContactInfo({ userInfo }: ContactInfoProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Контактная информация</Text>
      <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>Телефон</Text>
        <Text style={styles.infoValue}>{userInfo.phone}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoValue}>{userInfo.email}</Text>
      </View>
    </View>
  );
} 