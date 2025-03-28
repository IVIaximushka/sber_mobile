import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TriangleAlert as AlertTriangle, Shield, Bell } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.emergencySection}>
        <TouchableOpacity style={styles.emergencyButton}>
          <Shield size={32} color="#FF3B30" />
          <Text style={styles.emergencyText}>Экстренная связь</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.alertsSection}>
        <View style={styles.sectionHeader}>
          <AlertTriangle size={24} color="#FF9500" />
          <Text style={styles.sectionTitle}>Чрезвычайные ситуации</Text>
        </View>
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>Плановое отключение воды</Text>
          <Text style={styles.alertTime}>Сегодня, 10:00 - 15:00</Text>
          <Text style={styles.alertDescription}>
            В связи с проведением планового ремонта будет отключено горячее водоснабжение.
          </Text>
        </View>
      </View>

      <View style={styles.announcementsSection}>
        <View style={styles.sectionHeader}>
          <Bell size={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>Объявления УК</Text>
        </View>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.announcementCard}>
            <Text style={styles.announcementTitle}>Собрание жильцов</Text>
            <Text style={styles.announcementDate}>15 марта 2024</Text>
            <Text style={styles.announcementDescription}>
              Приглашаем всех жильцов на ежегодное собрание по вопросам благоустройства двора.
            </Text>
          </View>
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
  emergencySection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    padding: 16,
    borderRadius: 12,
  },
  emergencyText: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  alertsSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  alertCard: {
    backgroundColor: '#FFF9E5',
    padding: 16,
    borderRadius: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  alertDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  announcementsSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  announcementCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingVertical: 16,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  announcementDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});