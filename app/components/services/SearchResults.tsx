import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './ServiceStyles';
import { AdditionalService } from './ServiceData';
import { AdditionalServiceCard } from './AdditionalServiceCard';

interface SearchResultsProps {
  services: AdditionalService[];
  searchQuery: string;
  onSelectService: (id: string) => void;
}

export function SearchResults({ services, searchQuery, onSelectService }: SearchResultsProps) {
  return (
    <View style={styles.servicesResultsContainer}>
      {services.map((service, index) => (
        <AdditionalServiceCard 
          key={index} 
          service={service} 
          onSelect={onSelectService} 
        />
      ))}
      {services.length === 0 && searchQuery.length > 0 && (
        <Text style={styles.noResultsText}>Услуги не найдены</Text>
      )}
    </View>
  );
} 