import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Image, Animated } from 'react-native';
import { ChevronLeft, CreditCard, Plus, Check, Heart } from 'lucide-react-native';
import { useState, useRef, useEffect } from 'react';
import { ScrollView as RNScrollView } from 'react-native';

const PRIMARY_COLOR = '#8B1E3F';
const CARD_COLORS = ['#8B1E3F', '#1E8B6F', '#1E3F8B', '#8B6F1E', '#3F8B1E', '#8B1E8B', '#1E8B8B'];
const SBP_COLOR = '#FFB300';

interface PaymentPageProps {
  onBackPress: () => void;
  amount: number;
  title: string;
  currentAmount: number; // Уже собранная сумма
  onDonationComplete?: (amount: number) => void;
}

interface SavedCard {
  id: string;
  number: string;
  expiryDate: string;
  color: string;
}

function getRandomColor() {
  return CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)];
}

export function PaymentPage({ onBackPress, amount, title, currentAmount, onDonationComplete }: PaymentPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'sber' | 'newCard' | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isNewCardModalVisible, setIsNewCardModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [donationPercent, setDonationPercent] = useState<string>('');
  const [isOverLimit, setIsOverLimit] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [remainingAmount, setRemainingAmount] = useState(amount - currentAmount);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([
    {
      id: '1',
      number: '**** **** **** 1234',
      expiryDate: '12/25',
      color: getRandomColor(),
    }
  ]);

  // Анимация для эффекта пульсации и появления элементов
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  
  // Эффект для анимации при показе модального окна
  useEffect(() => {
    if (isSuccessModalVisible) {
      // Пульсация
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
      
      // Появление текста и кнопки
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Сброс анимации при закрытии
      fadeAnim.setValue(0);
      slideAnim.setValue(20);
    }
  }, [isSuccessModalVisible]);

  const handlePayment = () => {
    const parsedAmount = parseInt(donationAmount.replace(/\D/g, ''));
    if (!parsedAmount || parsedAmount <= 0) {
      alert('Пожалуйста, введите корректную сумму');
      return;
    }
    
    // Открываем модальное окно подтверждения вместо прямой оплаты
    setIsConfirmationModalVisible(true);
  };
  
  const handleConfirmPayment = () => {
    setIsConfirmationModalVisible(false);
    
    const parsedAmount = parseInt(donationAmount.replace(/\D/g, ''));
    
    if (selectedMethod === 'sber') {
      setSuccessMessage('Вам на карту пришло оповещение. Перейдите в банк и оплатите.');
      setIsSuccessModalVisible(true);
    } else if (selectedMethod === 'card') {
      if (onDonationComplete) {
        onDonationComplete(parsedAmount);
      }
      setSuccessMessage(`Спасибо за ваше пожертвование в размере ${parsedAmount.toLocaleString()} ₽!`);
      setIsSuccessModalVisible(true);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccessModalVisible(false);
    onBackPress();
  };

  const handleAddNewCard = () => {
    if (cardNumber && expiryDate && cvv && cardholderName) {
      const newCard: SavedCard = {
        id: String(Date.now()),  // Уникальный ID на основе времени
        number: `**** **** **** ${cardNumber.slice(-4)}`,
        expiryDate: expiryDate,
        color: getRandomColor(),
      };
      setSavedCards([...savedCards, newCard]);
      setSelectedMethod('card');
      setSelectedCardId(newCard.id);
      setIsNewCardModalVisible(false);
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setCardholderName('');
    }
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const formatAmount = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned) {
      const parsedAmount = parseInt(cleaned);
      
      // Расчет процента от оставшейся суммы сбора
      const remaining = amount - currentAmount;
      
      // Ограничиваем вводимую сумму максимальным оставшимся значением
      const limitedAmount = Math.min(parsedAmount, remaining);
      
      const percent = remaining > 0 ? ((limitedAmount / remaining) * 100).toFixed(1) : '100';
      setDonationPercent(percent);
      
      // Проверка, завершен ли сбор
      setIsComplete(limitedAmount >= remaining);
      // Превышение больше не требуется проверять, так как мы ограничили вводимую сумму
      setIsOverLimit(false);
      
      // Возвращаем ограниченную сумму
      return limitedAmount.toLocaleString();
    }
    setDonationPercent('0');
    setIsComplete(false);
    setIsOverLimit(false);
    return '';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Пожертвование</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Сумма пожертвования</Text>
          
          <View style={styles.remainingContainer}>
            <Text style={styles.remainingText}>
              {remainingAmount > 0 
                ? `Осталось собрать: ${remainingAmount.toLocaleString()} ₽` 
                : "Сбор средств завершен!"}
            </Text>
          </View>
          
          <View style={styles.amountInputContainer}>
            <TextInput
              style={styles.amountInput}
              value={donationAmount}
              onChangeText={(text) => setDonationAmount(formatAmount(text))}
              placeholder="Введите сумму"
              placeholderTextColor="rgba(139, 30, 63, 0.5)"
              keyboardType="numeric"
            />
            <Text style={styles.currencySymbol}>₽</Text>
          </View>
          
          {donationAmount && (
            <>
              <Text style={styles.percentText}>
                {parseFloat(donationPercent) > 100 
                  ? `100% от необходимой суммы`
                  : `${donationPercent}% от необходимой суммы`}
              </Text>
              
              {isComplete && (
                <View style={styles.completeBadge}>
                  <Text style={styles.completeText}>🎉 Сборы завершены! 🎉</Text>
                </View>
              )}
            </>
          )}
          
          <Text style={styles.paymentTitle}>{title}</Text>
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
              setIsNewCardModalVisible(true);
            }}>
            <View style={styles.cardAddIcon}><Plus size={28} color={PRIMARY_COLOR} /></View>
            <Text style={styles.cardAddText}>Добавить карту</Text>
            {selectedMethod === 'newCard' && <Check size={20} color={PRIMARY_COLOR} style={styles.cardCheck} />}
          </TouchableOpacity>
        </RNScrollView>

        <TouchableOpacity
          style={[
            styles.payButton, 
            (!selectedMethod || !donationAmount || selectedMethod === 'newCard') && styles.payButtonDisabled
          ]}
          onPress={handlePayment}
          disabled={!selectedMethod || !donationAmount || selectedMethod === 'newCard'}>
          <Text style={styles.payButtonText}>Пожертвовать</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={isNewCardModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsNewCardModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Новая карта</Text>
              <TouchableOpacity 
                onPress={() => setIsNewCardModalVisible(false)} 
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScroll}>
              <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Номер карты</Text>
                <TextInput
                  style={styles.formInput}
                  value={cardNumber}
                  onChangeText={(text) => setCardNumber(formatCardNumber(text).slice(0, 19))}
                  placeholder="0000 0000 0000 0000"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  maxLength={19}
                />
                
                <View style={styles.row}>
                  <View style={styles.halfWidth}>
                    <Text style={styles.formLabel}>Срок действия</Text>
                    <TextInput
                      style={styles.formInput}
                      value={expiryDate}
                      onChangeText={(text) => setExpiryDate(formatExpiryDate(text).slice(0, 5))}
                      placeholder="ММ/ГГ"
                      placeholderTextColor="#8E8E93"
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>
                  <View style={styles.halfWidth}>
                    <Text style={styles.formLabel}>CVV</Text>
                    <TextInput
                      style={styles.formInput}
                      value={cvv}
                      onChangeText={(text) => setCvv(text.replace(/\D/g, '').slice(0, 3))}
                      placeholder="123"
                      placeholderTextColor="#8E8E93"
                      keyboardType="numeric"
                      maxLength={3}
                      secureTextEntry
                    />
                  </View>
                </View>

                <Text style={styles.formLabel}>Имя владельца</Text>
                <TextInput
                  style={styles.formInput}
                  value={cardholderName}
                  onChangeText={setCardholderName}
                  placeholder="IVAN IVANOV"
                  placeholderTextColor="#8E8E93"
                  autoCapitalize="characters"
                />

                <TouchableOpacity 
                  style={[
                    styles.submitButton,
                    (!cardNumber || !expiryDate || !cvv || !cardholderName) && styles.submitButtonDisabled
                  ]}
                  onPress={handleAddNewCard}
                  disabled={!cardNumber || !expiryDate || !cvv || !cardholderName}>
                  <Text style={styles.submitButtonText}>Добавить карту</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Обновленное модальное окно подтверждения пожертвования */}
      <Modal
        visible={isConfirmationModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsConfirmationModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationCard}>
            <View style={styles.confirmHeader}>
              <Text style={styles.confirmationTitle}>Подтверждение</Text>
            </View>
            
            <View style={styles.confirmContent}>
              <Text style={styles.confirmLabel}>Сумма пожертвования:</Text>
              <Text style={styles.confirmationAmount}>
                {donationAmount ? parseInt(donationAmount.replace(/\D/g, '')).toLocaleString() : '0'} ₽
              </Text>
              
              <Text style={styles.confirmLabel}>Цель:</Text>
              <Text style={styles.confirmationPurpose}>{title}</Text>
              
              {donationAmount && (
                <Text style={styles.confirmPercent}>
                  {parseFloat(donationPercent) > 0 
                    ? `Вы вносите ${donationPercent}% от необходимой суммы`
                    : ''}
                </Text>
              )}
              
              <View style={styles.confirmationButtons}>
                <TouchableOpacity 
                  style={[styles.confirmationButton, styles.cancelButton]}
                  onPress={() => setIsConfirmationModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Отмена</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.confirmationButton, styles.confirmButton]}
                  onPress={handleConfirmPayment}>
                  <Text style={styles.confirmButtonText}>Оплатить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Модальное окно успешной оплаты */}
      <Modal
        visible={isSuccessModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseSuccess}>
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successBackground}>
              <View style={[styles.successDecor, styles.successDecor1]} />
              <View style={[styles.successDecor, styles.successDecor2]} />
              <View style={[styles.successDecor, styles.successDecor3]} />
            </View>
            
            <Animated.View 
              style={[
                styles.successIconContainer,
                { transform: [{ scale: pulseAnim }] }
              ]}>
              {selectedMethod === 'sber' ? (
                <Text style={styles.sbpSuccessText}>СБП</Text>
              ) : (
                <Heart size={36} color="#FFFFFF" fill="#FFFFFF" />
              )}
            </Animated.View>
            
            <Animated.View style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              width: '100%',
              alignItems: 'center'
            }}>
              <Text style={styles.successTitle}>
                {selectedMethod === 'sber' ? 'Платеж инициирован' : 'Спасибо за пожертвование!'}
              </Text>
              <Text style={styles.successMessage}>{successMessage}</Text>
              
              <TouchableOpacity 
                style={styles.successButton}
                onPress={handleCloseSuccess}>
                <Text style={styles.successButtonText}>Вернуться</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: PRIMARY_COLOR,
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  amountCard: {
    backgroundColor: 'rgba(139, 30, 63, 0.08)',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  amountLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: PRIMARY_COLOR,
    marginBottom: 12,
  },
  remainingContainer: {
    backgroundColor: 'rgba(139, 30, 63, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  remainingText: {
    fontSize: 14,
    fontWeight: '600',
    color: PRIMARY_COLOR,
    textAlign: 'center',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(139, 30, 63, 0.3)',
    marginBottom: 12,
    width: '100%',
  },
  amountInput: {
    flex: 1,
    height: 20,
    fontSize: 20,
    fontWeight: '700',
    color: PRIMARY_COLOR,
    textAlign: 'center',
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '700',
    color: PRIMARY_COLOR,
    marginLeft: 8,
  },
  percentText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: PRIMARY_COLOR,
    marginTop: 4,
    marginBottom: 10,
    textAlign: 'center',
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  paymentMethodsScroll: {
    paddingRight: 16,
    paddingBottom: 8,
    marginBottom: 16
  },
  paymentCard: {
    width: 160,
    height: 120,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    marginBottom: 8,
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPaymentCard: {
    borderColor: '#fff',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  cardBankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBankName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  cardType: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  cardExpiry: {
    color: '#fff',
    fontSize: 12,
  },
  cardCheck: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  addCard: {
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderColor: '#B0B0B0',
    borderWidth: 2,
  },
  cardAddIcon: {
    marginBottom: 8,
  },
  cardAddText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  sbpLogo: {
    width: 48,
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  sbpText: {
    fontWeight: 'bold',
    color: SBP_COLOR,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardSubtext: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
  },
  payButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  payButtonDisabled: {
    backgroundColor: '#E5E5EA',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#8E8E93',
  },
  modalScroll: {
    padding: 16,
  },
  formContainer: {
    gap: 16,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#E5E5EA',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '80%',
    maxWidth: 320,
    alignSelf: 'center',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  confirmHeader: {
    backgroundColor: PRIMARY_COLOR,
    padding: 16,
    alignItems: 'center',
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  confirmContent: {
    padding: 16
  },
  confirmLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4
  },
  confirmationAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: PRIMARY_COLOR,
    marginBottom: 16,
  },
  confirmationPurpose: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 16,
  },
  confirmPercent: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  confirmationButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F2F2F7',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  confirmButton: {
    backgroundColor: PRIMARY_COLOR,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '85%',
    alignSelf: 'center',
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  successBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.05,
  },
  successDecor: {
    position: 'absolute',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 100,
  },
  successDecor1: {
    width: 150,
    height: 150,
    top: -50,
    right: -50,
  },
  successDecor2: {
    width: 100,
    height: 100,
    bottom: -30,
    left: -30,
  },
  successDecor3: {
    width: 70,
    height: 70,
    bottom: 40,
    right: -20,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 17,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 28,
    lineHeight: 24,
  },
  successButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  sbpSuccessText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  completeBadge: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  completeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
}); 