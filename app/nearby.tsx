import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Store, Utensils, Dumbbell, Scissors, ChevronLeft, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const PRIMARY_COLOR = '#006D3B';
const { width } = Dimensions.get('window');

export default function NearbyScreen() {
  const router = useRouter();

  const nearbyPlaces = [
    { id: 1, title: 'Продуктовый', icon: Store, distance: '0.2 км', type: 'store', address: 'ул. Ленина, 10' },
    { id: 2, title: 'Ресторан', icon: Utensils, distance: '0.3 км', type: 'restaurant', address: 'пр. Мира, 25' },
    { id: 3, title: 'Фитнес', icon: Dumbbell, distance: '0.5 км', type: 'fitness', address: 'ул. Гагарина, 15' },
    { id: 4, title: 'Салон', icon: Scissors, distance: '0.4 км', type: 'beauty', address: 'ул. Пушкина, 8' },
    { id: 5, title: 'Аптека', icon: Store, distance: '0.6 км', type: 'pharmacy', address: 'пр. Ленина, 45' },
    { id: 6, title: 'Кофейня', icon: Utensils, distance: '0.3 км', type: 'cafe', address: 'ул. Мира, 12' },
    { id: 7, title: 'Йога', icon: Dumbbell, distance: '0.7 км', type: 'fitness', address: 'ул. Гагарина, 20' },
    { id: 8, title: 'Маникюр', icon: Scissors, distance: '0.5 км', type: 'beauty', address: 'ул. Пушкина, 15' },
  ];

  return (
    <View style={styles.container}>
      {/* Добавляем заголовок */}
      <Text style={styles.header}>Рядом с домом</Text>
      
      <ScrollView style={styles.content}>
        <View style={styles.placesGrid}>
          {nearbyPlaces.map((place) => (
            <TouchableOpacity 
              key={place.id} 
              style={styles.placeCard}>
              <View style={styles.placeIconContainer}>
                <place.icon size={24} color={PRIMARY_COLOR} />
              </View>
              <View style={styles.placeInfo}>
                <Text style={styles.placeTitle}>{place.title}</Text>
                <View style={styles.placeDetails}>
                  <MapPin size={14} color="#8E8E93" />
                  <Text style={styles.placeAddress}>{place.address}</Text>
                </View>
                <Text style={styles.placeDistance}>{place.distance}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 70,
    marginBottom: 16,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  placesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
  },
  placeCard: {
    width: (width - 48) / 2,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  placeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  placeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  placeAddress: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
  },
  placeDistance: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    fontWeight: '500',
  },
}); 