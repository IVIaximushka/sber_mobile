import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Home, Wifi, Bell, School, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';

const PRIMARY_COLOR = '#8B1E3F';

export default function ServicesScreen() {
  const [selectedService, setSelectedService] = useState(null);
  
  const services = [
    { 
      id: 'zhkh', 
      icon: Home, 
      title: 'Оплата ЖКХ', 
      amount: '3,456.78 ₽',
      details: [
        { name: 'Отопление', amount: '1,234.56 ₽' },
        { name: 'Вода', amount: '678.90 ₽' },
        { name: 'Электричество', amount: '890.12 ₽' },
        { name: 'Газ', amount: '653.20 ₽' }
      ]
    },
    { 
      id: 'internet', 
      icon: Wifi, 
      title: 'Интернет', 
      amount: '750.00 ₽',
      details: [
        { name: 'Абонентская плата', amount: '650.00 ₽' },
        { name: 'Дополнительные услуги', amount: '100.00 ₽' }
      ]
    },
    { 
      id: 'security', 
      icon: Bell, 
      title: 'Сигнализация', 
      amount: '1,200.00 ₽',
      details: [
        { name: 'Охрана квартиры', amount: '800.00 ₽' },
        { name: 'Мониторинг', amount: '400.00 ₽' }
      ]
    },
    { 
      id: 'kindergarten', 
      icon: School, 
      title: 'Садик', 
      amount: '2,500.00 ₽',
      details: [
        { name: 'Питание', amount: '1,500.00 ₽' },
        { name: 'Образовательные услуги', amount: '800.00 ₽' },
        { name: 'Дополнительные занятия', amount: '200.00 ₽' }
      ]
    },
  ];

  if (selectedService) {
    const service = services.find(s => s.id === selectedService);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setSelectedService(null)}
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Услуги</Text>
          <View style={styles.cardsContainer}>
            {services.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.card}
                onPress={() => setSelectedService(item.id)}
              >
                <View style={[styles.cardIcon, { backgroundColor: PRIMARY_COLOR }]}>
                  <item.icon size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.utilityAmount}>{item.amount}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.detailsText}>Посмотреть детали</Text>
                  <ChevronRight size={16} color={PRIMARY_COLOR} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    paddingTop: 90,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: PRIMARY_COLOR,
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#5a2a37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  utilityAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: PRIMARY_COLOR,
    marginVertical: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  detailsText: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    marginRight: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    marginLeft: 4,
  },
  serviceDetailHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  serviceDetailTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginVertical: 8,
  },
  serviceDetailAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: PRIMARY_COLOR,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  detailName: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  detailAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: PRIMARY_COLOR,
  },
  fullWidthButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  fullWidthButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});