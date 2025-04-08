import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Droplet, Zap, Flame, Thermometer, Wrench, Brush, ChevronRight } from 'lucide-react-native';

const PRIMARY_COLOR = '#006D3B';

export default function ServicesScreen() {
  const utilities = [
    { icon: Droplet, title: 'Вода', amount: '1,234.56 ₽' },
    { icon: Zap, title: 'Электричество', amount: '2,345.67 ₽' },
    { icon: Flame, title: 'Газ', amount: '789.12 ₽' },
    { icon: Thermometer, title: 'Отопление', amount: '3,456.78 ₽' },
  ];

  const services = [
    { icon: Wrench, title: 'Вызов мастера', description: 'Сантехник, электрик, слесарь' },
    { icon: Brush, title: 'Уборка помещений', description: 'Мытье окон, уборка подъезда' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Коммунальные платежи</Text>
        <View style={styles.utilitiesGrid}>
          {utilities.map((item, index) => (
            <TouchableOpacity key={index} style={styles.utilityCard}>
              <item.icon size={24} color={PRIMARY_COLOR} />
              <Text style={styles.utilityTitle}>{item.title}</Text>
              <Text style={styles.utilityAmount}>{item.amount}</Text>
              <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payButtonText}>Оплатить</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Заказать услуги</Text>
        {services.map((item, index) => (
          <TouchableOpacity key={index} style={styles.serviceCard}>
            <item.icon size={24} color={PRIMARY_COLOR} />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>{item.title}</Text>
              <Text style={styles.serviceDescription}>{item.description}</Text>
            </View>
            <ChevronRight size={24} color="#8E8E93" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    padding: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1A1A1A',
  },
  utilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  utilityCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  utilityTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 8,
    color: '#1A1A1A',
  },
  utilityAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: PRIMARY_COLOR,
    marginBottom: 12,
  },
  payButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceInfo: {
    marginLeft: 16,
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#1A1A1A',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
});