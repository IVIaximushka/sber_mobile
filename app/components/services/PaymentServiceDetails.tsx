import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight, Check } from 'lucide-react-native';

import { styles } from './ServiceStyles';
import { PaymentService, PRIMARY_COLOR } from './ServiceData';
import { PaymentCardSelection } from './PaymentCardSelection';

interface PaymentServiceDetailsProps {
  service: PaymentService;
  onBack: () => void;
  onPaymentStatusChange?: (id: string, isPaid: boolean, paymentMethod: 'card' | 'sber') => void;
}

export function PaymentServiceDetails({ service, onBack, onPaymentStatusChange }: PaymentServiceDetailsProps) {
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  
  const handlePayButtonPress = () => {
    setIsPaymentModalVisible(true);
  };
  
  const handlePaymentComplete = (paymentMethod: 'card' | 'sber') => {
    if (onPaymentStatusChange) {
      onPaymentStatusChange(service.id, true, paymentMethod);
    }
  };

  // Определяем, нужно ли менять дизайн
  const shouldChangeDesign = service.isPaid && service.paymentMethod === 'card';
  const statusColor = service.paymentMethod === 'sber' ? '#FFB300' : '#4CAF50';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBack}
        >
          <ChevronRight 
            size={24} 
            color={shouldChangeDesign ? '#4CAF50' : PRIMARY_COLOR} 
            style={{ transform: [{ rotate: '180deg' }] }} 
          />
          <Text style={[
            styles.backButtonText,
            shouldChangeDesign && { color: '#4CAF50' }
          ]}>Назад</Text>
        </TouchableOpacity>
        
        <View style={[styles.serviceDetailHeader, shouldChangeDesign && styles.serviceDetailHeaderPaid]}>
          <View style={[styles.cardIcon, { backgroundColor: shouldChangeDesign ? '#4CAF50' : PRIMARY_COLOR }]}>
            {shouldChangeDesign ? (
              <Check size={24} color="#FFFFFF" />
            ) : (
              <service.icon size={24} color="#FFFFFF" />
            )}
          </View>
          <Text style={styles.serviceDetailTitle}>{service.title}</Text>
          <Text style={[
            styles.serviceDetailAmount,
            shouldChangeDesign && { color: '#4CAF50' }
          ]}>{service.amount}</Text>
          {service.isPaid && (
            <View style={[
              styles.paidStatusLarge, 
              { backgroundColor: statusColor }
            ]}>
              {service.paymentMethod === 'card' && <Check size={20} color="#FFFFFF" />}
              <Text style={styles.paidStatusTextLarge}>
                {service.paymentMethod === 'sber' ? 'Ожидает оплаты' : 'Оплачено'}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            shouldChangeDesign && { color: '#4CAF50' }
          ]}>Детализация</Text>
          {service.details.map((item, index) => (
            <View key={index} style={styles.detailItem}>
              <Text style={styles.detailName}>{item.name}</Text>
              <Text style={[
                styles.detailAmount,
                shouldChangeDesign && { color: '#4CAF50' }
              ]}>{item.amount}</Text>
            </View>
          ))}
          
          {!service.isPaid && (
            <TouchableOpacity 
              style={styles.fullWidthButton}
              onPress={handlePayButtonPress}
            >
              <Text style={styles.fullWidthButtonText}>Оплатить</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <PaymentCardSelection
        isVisible={isPaymentModalVisible}
        onClose={() => setIsPaymentModalVisible(false)}
        amount={service.amount}
        title={service.title}
        onPaymentComplete={handlePaymentComplete}
      />
    </ScrollView>
  );
} 