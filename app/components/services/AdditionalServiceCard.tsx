import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight, DollarSign, Clock } from 'lucide-react-native';

import { styles } from './ServiceStyles';
import { AdditionalService, PRIMARY_COLOR } from './ServiceData';

interface AdditionalServiceCardProps {
  service: AdditionalService;
  onSelect: (id: string) => void;
}

export function AdditionalServiceCard({ service, onSelect }: AdditionalServiceCardProps) {
  return (
    <TouchableOpacity 
      style={styles.serviceCard}
      onPress={() => onSelect(service.id)}
    >
      <service.icon size={24} color={PRIMARY_COLOR} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>{service.title}</Text>
        <Text style={styles.serviceDescription}>{service.description}</Text>
        <View style={styles.serviceCardDetails}>
          <View style={styles.serviceCardDetail}>
            <DollarSign size={14} color="#8E8E93" />
            <Text style={styles.serviceCardDetailText}>{service.price}</Text>
          </View>
          <View style={styles.serviceCardDetail}>
            <Clock size={14} color="#8E8E93" />
            <Text style={styles.serviceCardDetailText}>{service.timeframe}</Text>
          </View>
        </View>
      </View>
      <ChevronRight size={24} color="#8E8E93" />
    </TouchableOpacity>
  );
} 