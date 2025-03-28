import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Tag, Car, Percent } from 'lucide-react-native';

export default function MarketplaceScreen() {
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
});