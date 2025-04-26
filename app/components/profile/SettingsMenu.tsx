import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './ProfileStyles';
import { MenuItemType, defaultMenuItems } from './ProfileData';

interface SettingsMenuProps {
  menuItems?: MenuItemType[];
}

export function SettingsMenu({ menuItems = defaultMenuItems }: SettingsMenuProps) {
  return (
    <View style={styles.menuSection}>
      <Text style={styles.sectionTitle}>Настройки</Text>
      {menuItems.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.menuItem}
          onPress={item.onPress}
        >
          <item.icon size={24} color="#8B1E3F" />
          <Text style={styles.menuItemTitle}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
} 