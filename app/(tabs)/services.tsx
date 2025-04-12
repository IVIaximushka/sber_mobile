import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Droplet, Zap, Flame, Thermometer, Wrench, Brush, ChevronRight } from 'lucide-react-native';

const PRIMARY_COLOR = '#8B1E3F';

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

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Коммунальные услуги</Text>
          <View style={styles.cardsContainer}>
            {utilities.map((item, index) => (
              <TouchableOpacity key={index} style={styles.card}>
                <View style={[styles.cardIcon, { backgroundColor: PRIMARY_COLOR }]}>
                  <item.icon size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
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
    shadowColor: '#5a2a37',
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