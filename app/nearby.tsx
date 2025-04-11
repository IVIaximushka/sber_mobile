import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { Store, Utensils, Dumbbell, Scissors, ChevronLeft, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const PRIMARY_COLOR = '#8B1E3F';
const { width } = Dimensions.get('window');

export default function NearbyScreen() {
  const router = useRouter();

  const nearbyPlaces = [
    {
      id: '1',
      title: 'Магнит',
      type: 'store',
      distance: '0.2 км',
      address: 'ул. Ленина, 10',
      image: require('../assets/images/magnit.jpg'),
    },
    {
      id: '2',
      title: 'Пятерочка',
      type: 'store',
      distance: '0.3 км',
      address: 'ул. Ленина, 15',
      image: require('../assets/images/pyaterochka.jpg'),
    },
    {
      id: '3',
      title: 'Суши Роллы',
      type: 'restaurant',
      distance: '0.5 км',
      address: 'ул. Ленина, 20',
      image: require('../assets/images/sushi.jpg'),
    },
    {
      id: '4',
      title: 'Салон красоты Оксана',
      type: 'beauty',
      distance: '0.4 км',
      address: 'ул. Ленина, 25',
      image: require('../assets/images/salon.jpg'),
    },
    { 
      id: '5', 
      title: 'Азиатский стиль', 
      distance: '0.7 км', 
      type: 'restaurant', 
      address: 'пр. Мира, 25',
      image: require('../assets/images/rest.jpg'),
    },
    { 
      id: '6', 
      title: 'Спортзал Джим Джим', 
      distance: '0.5 км', 
      type: 'fitness', 
      address: 'ул. Гагарина, 15',
      image: require('../assets/images/gym.jpg'),
    },
    { 
      id:'7', 
      title: 'Аптека Плюс', 
      distance: '0.6 км', 
      type: 'pharmacy', 
      address: 'пр. Ленина, 45',
      image: require('../assets/images/pharmacy.jpg'),
    }
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
              <Image source={place.image} style={styles.placeImage} />
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
    shadowColor: '#5a2a37',
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
  placeImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
}); 