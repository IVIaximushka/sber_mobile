import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Search, ArrowLeft } from 'lucide-react-native';

import { styles } from './ServiceStyles';

interface SearchBarProps {
  isActive: boolean;
  searchQuery: string;
  onQueryChange: (text: string) => void;
  onFocus: () => void;
  onBack: () => void;
}

export function SearchBar({ 
  isActive, 
  searchQuery, 
  onQueryChange, 
  onFocus, 
  onBack 
}: SearchBarProps) {
  if (isActive) {
    return (
      <View style={styles.searchSection}>
        <View style={styles.searchContainerActive}>
          <TouchableOpacity 
            onPress={onBack}
            style={styles.backIconContainer}
          >
            <ArrowLeft size={20} color="#1A1A1A" />
          </TouchableOpacity>
          <Search size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Найти услугу (сантехник, электрик, уборка...)"
            value={searchQuery}
            onChangeText={onQueryChange}
            autoFocus={true}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.searchSection}>
      <TouchableOpacity 
        style={styles.searchContainer}
        onPress={onFocus}
      >
        <Search size={20} color="#8E8E93" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Найти услугу (сантехник, электрик, уборка...)</Text>
      </TouchableOpacity>
    </View>
  );
} 