import React from 'react';
import { View, Text } from 'react-native';
import { AlertCircle } from 'lucide-react-native';

import { styles } from './CameraStyles';

export function CameraFooter() {
  return (
    <View style={styles.footer}>
      <AlertCircle size={16} color="#8E8E93" />
      <Text style={styles.footerText}>
        Нажмите на камеру для просмотра видеопотока
      </Text>
    </View>
  );
} 