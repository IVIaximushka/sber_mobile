import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Droplet, Zap, Flame, Thermometer, Wrench, Brush } from 'lucide-react-native';

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
              <item.icon size={24} color="#007AFF" />
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
        <Text style={styles.sectionTitle}>Заказ услуг</Text>
        {services.map((item, index) => (
          <TouchableOpacity key={index} style={styles.serviceCard}>
            <item.icon size={24} color="#007AFF" />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>{item.title}</Text>
              <Text style={styles.serviceDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  section: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  utilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  utilityCard: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  utilityTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 4,
  },
  utilityAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  payButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 12,
  },
  serviceInfo: {
    marginLeft: 16,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
});