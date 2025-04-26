import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import { styles } from './ServiceStyles';
import { PaymentService, PRIMARY_COLOR } from './ServiceData';

interface PaymentServiceDetailsProps {
  service: PaymentService;
  onBack: () => void;
}

export function PaymentServiceDetails({ service, onBack }: PaymentServiceDetailsProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBack}
        >
          <ChevronRight size={24} color={PRIMARY_COLOR} style={{ transform: [{ rotate: '180deg' }] }} />
          <Text style={styles.backButtonText}>Назад</Text>
        </TouchableOpacity>
        
        <View style={styles.serviceDetailHeader}>
          <View style={[styles.cardIcon, { backgroundColor: PRIMARY_COLOR }]}>
            <service.icon size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.serviceDetailTitle}>{service.title}</Text>
          <Text style={styles.serviceDetailAmount}>{service.amount}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Детализация</Text>
          {service.details.map((item, index) => (
            <View key={index} style={styles.detailItem}>
              <Text style={styles.detailName}>{item.name}</Text>
              <Text style={styles.detailAmount}>{item.amount}</Text>
            </View>
          ))}
          
          <TouchableOpacity style={styles.fullWidthButton}>
            <Text style={styles.fullWidthButtonText}>Оплатить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
} 