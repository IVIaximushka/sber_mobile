import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { TriangleAlert as AlertTriangle, Shield, Bell, Tag, Car, Percent } from 'lucide-react-native';

export default function HomeScreen() {
  const listings = [
    {
      id: 1,
      type: 'Продажа',
      title: '3-комнатная квартира',
      price: '12,500,000 ₽',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 2,
      type: 'Аренда',
      title: '2-комнатная квартира',
      price: '45,000 ₽/мес',
      image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=300&h=200',
    },
  ];

  const parking = [
    { id: 1, spot: 'A-12', status: 'Свободно' },
    { id: 2, spot: 'B-15', status: 'Свободно' },
  ];

  const deals = [
    {
      id: 1,
      title: 'Скидка 20% на абонемент',
      partner: 'FitnessPro',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: 2,
      title: 'Скидка 15% на массаж',
      partner: 'SPA Center',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=300&h=200',
    },
  ];

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

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Tag size={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>Объявления</Text>
        </View>
        {listings.map((listing) => (
          <TouchableOpacity key={listing.id} style={styles.listingCard}>
            <Image source={{ uri: listing.image }} style={styles.listingImage} />
            <View style={styles.listingInfo}>
              <Text style={styles.listingType}>{listing.type}</Text>
              <Text style={styles.listingTitle}>{listing.title}</Text>
              <Text style={styles.listingPrice}>{listing.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Car size={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>Парковка</Text>
        </View>
        <View style={styles.parkingGrid}>
          {parking.map((spot) => (
            <View key={spot.id} style={styles.parkingSpot}>
              <Text style={styles.spotNumber}>{spot.spot}</Text>
              <Text style={styles.spotStatus}>{spot.status}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Percent size={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>Акции и скидки</Text>
        </View>
        {deals.map((deal) => (
          <TouchableOpacity key={deal.id} style={styles.dealCard}>
            <Image source={{ uri: deal.image }} style={styles.dealImage} />
            <View style={styles.dealInfo}>
              <Text style={styles.dealTitle}>{deal.title}</Text>
              <Text style={styles.dealPartner}>{deal.partner}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  section: {
    padding: 16,
    backgroundColor: '#FFFFFF',
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
  listingCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  listingImage: {
    width: 100,
    height: 100,
  },
  listingInfo: {
    flex: 1,
    padding: 12,
  },
  listingType: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 4,
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  listingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  parkingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  parkingSpot: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  spotNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  spotStatus: {
    fontSize: 14,
    color: '#34C759',
  },
  dealCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  dealImage: {
    width: '100%',
    height: 150,
  },
  dealInfo: {
    padding: 12,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  dealPartner: {
    fontSize: 14,
    color: '#8E8E93',
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