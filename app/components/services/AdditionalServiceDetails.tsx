import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight, DollarSign, Clock, Award } from 'lucide-react-native';

import { styles } from './ServiceStyles';
import { AdditionalService, PRIMARY_COLOR } from './ServiceData';

interface AdditionalServiceDetailsProps {
  service: AdditionalService;
  onBack: () => void;
}

export function AdditionalServiceDetails({ service, onBack }: AdditionalServiceDetailsProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBack}
        >
          <ChevronRight size={24} color={PRIMARY_COLOR} style={{ transform: [{ rotate: '180deg' }] }} />
          <Text style={styles.backButtonText}>Назад к поиску</Text>
        </TouchableOpacity>
        
        <View style={styles.serviceDetailHeader}>
          <View style={[styles.cardIcon, { backgroundColor: PRIMARY_COLOR }]}>
            <service.icon size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.serviceDetailTitle}>{service.title}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.serviceFullDescription}>{service.fullDescription}</Text>
          
          <View style={styles.serviceInfoContainer}>
            <View style={styles.serviceInfoItem}>
              <DollarSign size={20} color={PRIMARY_COLOR} />
              <View>
                <Text style={styles.serviceInfoLabel}>Стоимость</Text>
                <Text style={styles.serviceInfoValue}>{service.price}</Text>
              </View>
            </View>
            
            <View style={styles.serviceInfoItem}>
              <Clock size={20} color={PRIMARY_COLOR} />
              <View>
                <Text style={styles.serviceInfoLabel}>Сроки выполнения</Text>
                <Text style={styles.serviceInfoValue}>{service.timeframe}</Text>
              </View>
            </View>
            
            <View style={styles.serviceInfoItem}>
              <Award size={20} color={PRIMARY_COLOR} />
              <View>
                <Text style={styles.serviceInfoLabel}>Гарантия</Text>
                <Text style={styles.serviceInfoValue}>{service.warranty}</Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.advantagesTitle}>Преимущества</Text>
          <View style={styles.advantagesList}>
            {service.advantages.map((advantage, index) => (
              <View key={index} style={styles.advantageItem}>
                <View style={styles.advantageDot} />
                <Text style={styles.advantageText}>{advantage}</Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={styles.fullWidthButton}>
            <Text style={styles.fullWidthButtonText}>Заказать</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
} 