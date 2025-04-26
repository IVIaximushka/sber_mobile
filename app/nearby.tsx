import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { ChevronLeft, MapPin, QrCode } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { BackHandler } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useNavigation } from '../lib/navigationContext';

const PRIMARY_COLOR = '#8B1E3F';
const GRADIENT_COLORS = ['#FFB8B8', '#FF9E9E', '#FFD1D1', '#FFE8E8'] as const;

interface Place {
  id: string;
  title: string;
  icon: string;
  distance: string;
  type: string;
  address: string;
  discount: string;
  promotion: string;
  image: any;
}

// Имитация базы данных мест
const nearbyPlaces: Place[] = [
  {
    id: '1',
    title: 'Магнит',
    icon: 'store',
    distance: '0.2 км',
    type: 'store',
    address: 'ул. Ленина, 10',
    discount: '10%',
    promotion: 'Покупки со скидкой',
    image: require('../assets/images/magnit.jpg'),
  },
  {
    id: '2',
    title: 'Суши Роллы',
    icon: 'restaurant',
    distance: '0.3 км',
    type: 'restaurant',
    address: 'ул. Ленина, 15',
    discount: '15%',
    promotion: 'Акция на второе блюдо',
    image: require('../assets/images/sushi.jpg'),
  },
  {
    id: '3',
    title: 'Фитнес-клуб Джим Джим',
    icon: 'fitness',
    distance: '0.5 км',
    type: 'fitness',
    address: 'ул. Ленина, 20',
    discount: '20%',
    promotion: 'Первое посещение бесплатно',
    image: require('../assets/images/gym.jpg'),
  },
  {
    id: '4',
    title: 'Салон красоты "Оксана"',
    icon: 'beauty',
    distance: '0.4 км',
    type: 'beauty',
    address: 'ул. Ленина, 25',
    discount: '25%',
    promotion: 'Скидка на стрижку',
    image: require('../assets/images/salon.jpg'),
  },
  {
    id: '5',
    title: 'Аптека "Здоровье"',
    icon: 'pharmacy',
    distance: '0.6 км',
    type: 'pharmacy',
    address: 'ул. Ленина, 30',
    discount: '5%',
    promotion: 'Скидка на витамины',
    image: require('../assets/images/pharmacy.jpg'),
  },
  {
    id: '6',
    title: 'Азиатский стиль',
    icon: 'restaurant',
    distance: '0.7 км',
    type: 'restaurant',
    address: 'ул. Ленина, 35',
    discount: '45%',
    promotion: 'Скидка на первый заказ',
    image: require('../assets/images/rest.jpg'),
  },
  {
    id: '7',
    icon: 'store',
    title: 'Пятерочка',
    type: 'store',
    distance: '0.3 км',
    address: 'ул. Ленина, 15',
    discount: '10%',
    promotion: 'Скидка на всю продукцию',
    image: require('../assets/images/pyaterochka.jpg'),
  },
];

export default function NearbyScreen() {
  const router = useRouter();
  const customNavigation = useNavigation();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);

  // Настраиваем обработку кнопки "назад"
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Если открыто модальное окно QR-кода, закрываем его
        if (showQRCode) {
          setShowQRCode(false);
          return true;
        }
        
        // В противном случае используем историю навигации
        const previousScreen = customNavigation.getPreviousScreen();
        if (previousScreen) {
          router.push(previousScreen);
        } else {
          router.push('/(tabs)');
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [router, customNavigation, showQRCode])
  );

  const handlePlacePress = (place: Place) => {
    setSelectedPlace(place);
    setShowQRCode(true);
  };

  const handleCloseQRCode = () => {
    setShowQRCode(false);
  };

  // Обработчик нажатия кнопки назад в заголовке
  const handleBackPress = () => {
    const previousScreen = customNavigation.getPreviousScreen();
    if (previousScreen) {
      router.push(previousScreen);
    } else {
      router.push('/(tabs)');
    }
  };

  return (
    <LinearGradient
      colors={GRADIENT_COLORS}
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Рядом с домом</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.placesGrid}>
          {nearbyPlaces.map((place) => (
            <TouchableOpacity 
              key={place.id} 
              style={styles.placeCard}
              onPress={() => handlePlacePress(place)}>
              <Image source={place.image} style={styles.placeImage} />
              <View style={styles.placeInfo}>
                <Text style={styles.placeTitle}>{place.title}</Text>
                <View style={styles.placeDetails}>
                  <MapPin size={16} color="#8E8E93" />
                  <Text style={styles.placeDistance}>{place.distance}</Text>
                </View>
                <Text style={styles.placeAddress}>{place.address}</Text>
                <View style={styles.discountContainer}>
                  <Text style={styles.discountText}>{place.discount}</Text>
                  <Text style={styles.promotionText}>{place.promotion}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={showQRCode}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseQRCode}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>QR-код скидки</Text>
            <Text style={styles.modalSubtitle}>{selectedPlace?.title}</Text>
            <View style={styles.qrCodeContainer}>
              <QrCode size={200} color="#000000" />
            </View>
            <Text style={styles.qrCodeText}>
              Скидка: {selectedPlace?.discount}
            </Text>
            <Text style={styles.qrCodeDescription}>
              {selectedPlace?.promotion}
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleCloseQRCode}>
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  placesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  placeCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#5a2a37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  placeImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  placeInfo: {
    padding: 12,
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
  placeDistance: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
  },
  placeAddress: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  discountContainer: {
    backgroundColor: `${PRIMARY_COLOR}10`,
    padding: 8,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 16,
    fontWeight: '700',
    color: PRIMARY_COLOR,
    marginBottom: 4,
  },
  promotionText: {
    fontSize: 12,
    color: '#1A1A1A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 24,
  },
  qrCodeContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
  },
  qrCodeText: {
    fontSize: 18,
    fontWeight: '600',
    color: PRIMARY_COLOR,
    marginBottom: 8,
  },
  qrCodeDescription: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 