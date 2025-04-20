import React from 'react';
import { View, Text } from 'react-native';
import { Shield } from 'lucide-react-native';

import { styles } from './CameraStyles';

interface CameraHeaderProps {
  camerasCount: number;
}

export function CameraHeader({ camerasCount }: CameraHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Shield size={24} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Система видеонаблюдения</Text>
      </View>
      <Text style={styles.headerSubtitle}>Всего камер: {camerasCount}</Text>
    </View>
  );
} 