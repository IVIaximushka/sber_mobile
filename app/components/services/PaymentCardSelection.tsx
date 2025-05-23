import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { CreditCard, Plus, Check } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { PRIMARY_COLOR } from './ServiceData';
import { styles } from './PaymentCardSelectionStyles';

const SBP_COLOR = '#FFB300';

interface PaymentCardSelectionProps {
  isVisible: boolean;
  onClose: () => void;
  amount: string;
  title: string;
  onPaymentComplete: (paymentMethod: 'card' | 'sber') => void;
}

interface SavedCard {
  id: string;
  number: string;
  expiryDate: string;
  color: string;
}

export function PaymentCardSelection({ 
  isVisible, 
  onClose, 
  amount, 
  title,
  onPaymentComplete 
}: PaymentCardSelectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'sber' | 'newCard' | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [savedCards, setSavedCards] = useState<SavedCard[]>([
    {
      id: '1',
      number: '**** **** **** 1234',
      expiryDate: '12/25',
      color: '#8B1E3F',
    },
    {
      id: '2',
      number: '**** **** **** 5678',
      expiryDate: '06/26',
      color: '#1E8B6F',
    }
  ]);

  const handlePayment = () => {
    if (selectedMethod === 'sber') {
      setSuccessMessage('Вам на карту пришло оповещение. Перейдите в банк и оплатите.');
    } else if (selectedMethod === 'card') {
      setSuccessMessage(`Оплата успешно выполнена!`);
    }
    
    setIsSuccessModalVisible(true);
  };

  const handleCloseSuccess = () => {
    setIsSuccessModalVisible(false);
    if (selectedMethod && selectedMethod !== 'newCard') {
      onPaymentComplete(selectedMethod);
    }
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Оплата услуги</Text>
            <TouchableOpacity 
              onPress={onClose} 
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalScroll}>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>{title}</Text>
              <Text style={styles.paymentAmount}>{amount}</Text>
            </View>

            <Text style={styles.sectionTitle}>Способ оплаты</Text>
            
            <RNScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.paymentMethodsScroll}>
              
              {savedCards.map(card => (
                <TouchableOpacity
                  key={card.id}
                  style={[
                    styles.paymentCard,
                    { backgroundColor: card.color },
                    selectedCardId === card.id && styles.selectedPaymentCard
                  ]}
                  onPress={() => {
                    setSelectedMethod('card');
                    setSelectedCardId(card.id);
                  }}>
                  <View style={styles.cardBankRow}>
                    <Text style={styles.cardBankName}>СБЕР БАНК</Text>
                    <Text style={styles.cardType}>VISA</Text>
                  </View>
                  <Text style={styles.cardNumber}>{card.number}</Text>
                  <Text style={styles.cardExpiry}>Срок: {card.expiryDate}</Text>
                  {selectedCardId === card.id && <Check size={20} color="#fff" style={styles.cardCheck} />}
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity
                style={[
                  styles.paymentCard,
                  { backgroundColor: SBP_COLOR },
                  selectedMethod === 'sber' && styles.selectedPaymentCard
                ]}
                onPress={() => {
                  setSelectedMethod('sber');
                  setSelectedCardId(null);
                }}>
                <View style={styles.sbpLogo}><Text style={styles.sbpText}>СБП</Text></View>
                <Text style={styles.cardText}>СБП</Text>
                <Text style={styles.cardSubtext}>Быстрый платеж</Text>
                {selectedMethod === 'sber' && <Check size={20} color="#fff" style={styles.cardCheck} />}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.paymentCard,
                  styles.addCard,
                  selectedMethod === 'newCard' && styles.selectedPaymentCard
                ]}
                onPress={() => {
                  setSelectedMethod('newCard');
                  setSelectedCardId(null);
                }}>
                <View style={styles.cardAddIcon}><Plus size={28} color={PRIMARY_COLOR} /></View>
                <Text style={styles.cardAddText}>Добавить карту</Text>
              </TouchableOpacity>
            </RNScrollView>

            <TouchableOpacity
              style={[
                styles.payButton, 
                (!selectedMethod || selectedMethod === 'newCard') && styles.payButtonDisabled
              ]}
              onPress={handlePayment}
              disabled={!selectedMethod || selectedMethod === 'newCard'}>
              <Text style={styles.payButtonText}>Оплатить</Text>
            </TouchableOpacity>
          </ScrollView>
          
          <Modal
            visible={isSuccessModalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={handleCloseSuccess}>
            <View style={[styles.modalOverlay, styles.successModalOverlay]}>
              <View style={styles.successModalContent}>
                <View style={styles.successIcon}>
                  <Check size={40} color="#FFFFFF" />
                </View>
                <Text style={styles.successTitle}>Готово!</Text>
                <Text style={styles.successMessage}>{successMessage}</Text>
                <TouchableOpacity
                  style={styles.successButton}
                  onPress={handleCloseSuccess}>
                  <Text style={styles.successButtonText}>Закрыть</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Modal>
  );
} 