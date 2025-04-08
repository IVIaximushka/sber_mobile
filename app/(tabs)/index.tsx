import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { Bell, ChevronRight, Calendar, Clock, MapPin, Users, Store, Utensils, Dumbbell, Scissors, ChevronLeft, AlertTriangle, Droplet, Zap, Flame, Home, Building2, Percent } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const PRIMARY_COLOR = '#006D3B';
const { width } = Dimensions.get('window');

const nearbyServices = [
  {
    id: '1',
    title: 'Магнит',
    type: 'store',
    distance: '0.2 км',
    address: 'ул. Ленина, 10',
    image: require('../../assets/images/magnit.jpg'),
  },
  {
    id: '2',
    title: 'Пятерочка',
    type: 'store',
    distance: '0.3 км',
    address: 'ул. Ленина, 15',
    image: require('../../assets/images/pyaterochka.jpg'),
  },
  {
    id: '3',
    title: 'Суши Роллы',
    type: 'restaurant',
    distance: '0.5 км',
    address: 'ул. Ленина, 20',
    image: require('../../assets/images/sushi.jpg'),
  },
  {
    id: '4',
    title: 'Салон красоты Оксана',
    type: 'beauty',
    distance: '0.4 км',
    address: 'ул. Ленина, 25',
    image: require('../../assets/images/salon.jpg'),
  },
];

const realEstateListings = [
  {
    id: '1',
    title: '2-комнатная квартира',
    price: '12 500 000 ₽',
    area: '65 м²',
    floor: '5/9 этаж',
    address: 'ул. Ленина, 10',
    image: require('../../assets/images/apartment1.jpg'),
  },
  {
    id: '2',
    title: '1-комнатная квартира',
    price: '8 900 000 ₽',
    area: '35 м²',
    floor: '3/9 этаж',
    address: 'ул. Ленина, 10',
    image: require('../../assets/images/apartment2.jpg'),
  },
];

const managementAnnouncements = [
  {
    id: '1',
    title: 'Ремонт лифта',
    date: '15 марта',
    description: 'Плановый ремонт лифта №2',
    image: require('../../assets/images/elevator.jpg'),
  },
  {
    id: '2',
    title: 'Уборка территории',
    date: '20 марта',
    description: 'Генеральная уборка придомовой территории',
    image: require('../../assets/images/cleaning.jpg'),
  },
];

const promotions = [
  {
    id: '1',
    title: 'Скидка на парковку',
    discount: '20%',
    description: 'При оплате за 6 месяцев',
    image: require('../../assets/images/parking.jpg'),
  },
  {
    id: '2',
    title: 'Бесплатный вывоз мусора',
    discount: '100%',
    description: 'При сдаче макулатуры',
    image: require('../../assets/images/recycling.jpg'),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);

  const emergencies = [
    {
      id: 1,
      title: 'Отключение воды',
      description: 'В связи с ремонтными работами',
      date: '25 марта',
      time: '10:00 - 18:00',
      type: 'water',
      icon: Droplet,
      color: '#E5F3FF',
    },
    {
      id: 2,
      title: 'Отключение света',
      description: 'Плановые работы',
      date: '26 марта',
      time: '09:00 - 17:00',
      type: 'electricity',
      icon: Zap,
      color: '#FFF3E5',
    },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Собрание жильцов',
      date: '25 марта',
      time: '19:00',
      location: 'Клубная гостиная',
      participants: 12,
      image: require('../../assets/images/meeting.jpg'),
    },
    {
      id: 2,
      title: 'Ремонт лифта',
      date: '26 марта',
      time: '10:00 - 18:00',
      location: 'Лифт №2',
      participants: 0,
      image: require('../../assets/images/elevator.jpg'),
    },
    {
      id: 3,
      title: 'Уборка территории',
      date: '27 марта',
      time: '09:00',
      location: 'Придомовая территория',
      participants: 5,
      image: require('../../assets/images/cleaning.jpg'),
    },
  ];

  const renderSection = (title: string, items: any[], icon: any, onPress: () => void) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          {icon}
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>Все</Text>
          <ChevronRight size={16} color={PRIMARY_COLOR} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {items.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {item.price && <Text style={styles.cardPrice}>{item.price}</Text>}
              {item.area && <Text style={styles.cardDetails}>{item.area} • {item.floor}</Text>}
              {item.address && <Text style={styles.cardAddress}>{item.address}</Text>}
              {item.date && <Text style={styles.cardDate}>{item.date}</Text>}
              {item.description && <Text style={styles.cardDescription}>{item.description}</Text>}
              {item.distance && <Text style={styles.cardDistance}>{item.distance}</Text>}
              {item.discount && (
                <View style={styles.discountContainer}>
                  <Text style={styles.discountText}>{item.discount}</Text>
                  <Text style={styles.discountLabel}>скидка</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>АИ</Text>
          </View>
          <View style={styles.userTextContainer}>
            <Text style={styles.greeting}>Добрый день,</Text>
            <Text style={styles.userName}>Анна Иванова</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={PRIMARY_COLOR} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {emergencies.length > 0 && (
        <View style={styles.emergenciesContainer}>
          <View style={styles.emergenciesHeader}>
            <AlertTriangle size={24} color="#FF3B30" />
            <Text style={styles.emergenciesTitle}>Чрезвычайные ситуации</Text>
          </View>
          {emergencies.map((emergency) => (
            <TouchableOpacity key={emergency.id} style={styles.emergencyCard}>
              <View style={[styles.emergencyIconContainer, { backgroundColor: emergency.color }]}>
                <emergency.icon size={24} color={PRIMARY_COLOR} />
              </View>
              <View style={styles.emergencyContent}>
                <Text style={styles.emergencyTitle}>{emergency.title}</Text>
                <Text style={styles.emergencyDescription}>{emergency.description}</Text>
                <View style={styles.emergencyDetails}>
                  <View style={styles.detailItem}>
                    <Calendar size={16} color="#8E8E93" />
                    <Text style={styles.detailText}>{emergency.date}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Clock size={16} color="#8E8E93" />
                    <Text style={styles.detailText}>{emergency.time}</Text>
                  </View>
                </View>
              </View>
              <ChevronRight size={24} color="#8E8E93" />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.servicesContainer}>
        <View style={styles.servicesHeader}>
          <Text style={styles.sectionTitle}>Рядом с домом</Text>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/nearby')}>
            <Text style={styles.viewAllText}>Посмотреть</Text>
            <ChevronRight size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.servicesScroll}
          onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
          scrollEventThrottle={16}>
          {nearbyServices.map((service) => (
            <TouchableOpacity 
              key={service.id} 
              style={styles.serviceCard}
              onPress={() => router.push('/nearby')}>
              <Image source={service.image} style={styles.serviceImage} />
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDistance}>{service.distance}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {scrollPosition > 0 && (
          <TouchableOpacity 
            style={[styles.scrollButton, styles.scrollLeft]}
            onPress={() => setScrollPosition(0)}>
            <ChevronLeft size={24} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.announcementsContainer}>
        <Text style={styles.sectionTitle}>Объявления УК</Text>
        {announcements.map((announcement) => (
          <TouchableOpacity key={announcement.id} style={styles.announcementCard}>
            <Image source={announcement.image} style={styles.announcementImage} />
            <View style={styles.announcementContent}>
              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <View style={styles.announcementDetails}>
                <View style={styles.detailItem}>
                  <Calendar size={16} color="#8E8E93" />
                  <Text style={styles.detailText}>{announcement.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Clock size={16} color="#8E8E93" />
                  <Text style={styles.detailText}>{announcement.time}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MapPin size={16} color="#8E8E93" />
                  <Text style={styles.detailText}>{announcement.location}</Text>
                </View>
                {announcement.participants > 0 && (
                  <View style={styles.detailItem}>
                    <Users size={16} color="#8E8E93" />
                    <Text style={styles.detailText}>{announcement.participants} участников</Text>
                  </View>
                )}
              </View>
            </View>
            <ChevronRight size={24} color="#8E8E93" />
          </TouchableOpacity>
        ))}
      </View>

      {renderSection('Объявления о продаже', realEstateListings, <Home size={20} color={PRIMARY_COLOR} />, () => {})}
      {renderSection('Акции и скидки', promotions, <Percent size={20} color={PRIMARY_COLOR} />, () => {})}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  userTextContainer: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: 14,
    color: '#8E8E93',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  servicesContainer: {
    padding: 20,
    position: 'relative',
  },
  servicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    marginRight: 4,
  },
  servicesScroll: {
    flexGrow: 0,
  },
  serviceCard: {
    width: width * 0.4,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    color: '#1A1A1A',
  },
  serviceDistance: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  scrollButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scrollLeft: {
    left: 10,
  },
  announcementsContainer: {
    padding: 20,
  },
  announcementCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  announcementImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  announcementContent: {
    flex: 1,
    padding: 16,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  announcementDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 8,
  },
  emergenciesContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  emergenciesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergenciesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  emergencyCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emergencyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  emergencyDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    fontWeight: '500',
  },
  scrollView: {
    paddingLeft: 16,
  },
  card: {
    width: width * 0.7,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: PRIMARY_COLOR,
    marginBottom: 4,
  },
  cardDetails: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  cardAddress: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  cardDistance: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  discountContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  discountText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  discountLabel: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});