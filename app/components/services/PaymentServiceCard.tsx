import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight, Check } from 'lucide-react-native';

import { styles } from './ServiceStyles';
import { PaymentService, PRIMARY_COLOR } from './ServiceData';
import { PaymentCardSelection } from './PaymentCardSelection';

interface PaymentServiceCardProps {
  service: PaymentService;
  onSelect: (id: string) => void;
  onPaymentStatusChange?: (id: string, isPaid: boolean, paymentMethod: 'card' | 'sber') => void;
}

export function PaymentServiceCard({ service, onSelect, onPaymentStatusChange }: PaymentServiceCardProps) {
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  
  // Определяем, нужно ли менять дизайн
  const shouldChangeDesign = service.isPaid && service.paymentMethod === 'card';
  const statusColor = service.paymentMethod === 'sber' ? '#FFB300' : '#4CAF50';

  const handlePayButtonPress = (e: any) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    setIsPaymentModalVisible(true);
  };

  const handlePaymentComplete = (paymentMethod: 'card' | 'sber') => {
    if (onPaymentStatusChange) {
      onPaymentStatusChange(service.id, true, paymentMethod);
    }
  };

  return (
    <>
      <TouchableOpacity 
        style={[
          styles.card,
          shouldChangeDesign && styles.cardPaid
        ]}
        onPress={() => onSelect(service.id)}
      >
        <View style={[styles.cardIcon, { backgroundColor: shouldChangeDesign ? '#4CAF50' : PRIMARY_COLOR }]}>
          {shouldChangeDesign ? (
            <Check size={24} color="#FFFFFF" />
          ) : (
            <service.icon size={24} color="#FFFFFF" />
          )}
        </View>
        <Text style={styles.cardTitle}>{service.title}</Text>
        <Text style={[
          styles.utilityAmount,
          shouldChangeDesign && { color: '#4CAF50' }
        ]}>{service.amount}</Text>
        <View style={styles.cardFooter}>
          <Text style={[
            styles.detailsText,
            shouldChangeDesign && { color: '#4CAF50' }
          ]}>Посмотреть детали</Text>
          <ChevronRight size={16} color={shouldChangeDesign ? '#4CAF50' : PRIMARY_COLOR} />
        </View>
        {service.isPaid ? (
          <View style={[styles.paidStatus, { backgroundColor: statusColor }]}>
            {service.paymentMethod === 'card' && <Check size={16} color="#FFFFFF" />}
            <Text style={styles.paidStatusText}>
              {service.paymentMethod === 'sber' ? 'Ожидает оплаты' : 'Оплачено'}
            </Text>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.payButton}
            onPress={handlePayButtonPress}
          >
            <Text style={styles.payButtonText}>Оплатить</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      <PaymentCardSelection
        isVisible={isPaymentModalVisible}
        onClose={() => setIsPaymentModalVisible(false)}
        amount={service.amount}
        title={service.title}
        onPaymentComplete={handlePaymentComplete}
      />
    </>
  );
} 