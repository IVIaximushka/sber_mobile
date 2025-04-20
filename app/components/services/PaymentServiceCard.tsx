import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import { styles } from './ServiceStyles';
import { PaymentService, PRIMARY_COLOR } from './ServiceData';

interface PaymentServiceCardProps {
  service: PaymentService;
  onSelect: (id: string) => void;
}

export function PaymentServiceCard({ service, onSelect }: PaymentServiceCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onSelect(service.id)}
    >
      <View style={[styles.cardIcon, { backgroundColor: PRIMARY_COLOR }]}>
        <service.icon size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.cardTitle}>{service.title}</Text>
      <Text style={styles.utilityAmount}>{service.amount}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.detailsText}>Посмотреть детали</Text>
        <ChevronRight size={16} color={PRIMARY_COLOR} />
      </View>
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Оплатить</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
} 