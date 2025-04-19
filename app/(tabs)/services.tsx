import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Home, Wifi, Bell, School, ChevronRight, Search, Wrench, Zap, Brush, ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';

const PRIMARY_COLOR = '#8B1E3F';

export default function ServicesScreen() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedAdditionalService, setSelectedAdditionalService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const services = [
    { 
      id: 'zhkh', 
      icon: Home, 
      title: 'Оплата ЖКХ', 
      amount: '3,456.78 ₽',
      details: [
        { name: 'Отопление', amount: '1,234.56 ₽' },
        { name: 'Вода', amount: '678.90 ₽' },
        { name: 'Электричество', amount: '890.12 ₽' },
        { name: 'Газ', amount: '653.20 ₽' }
      ]
    },
    { 
      id: 'internet', 
      icon: Wifi, 
      title: 'Интернет', 
      amount: '750.00 ₽',
      details: [
        { name: 'Абонентская плата', amount: '650.00 ₽' },
        { name: 'Дополнительные услуги', amount: '100.00 ₽' }
      ]
    },
    { 
      id: 'security', 
      icon: Bell, 
      title: 'Сигнализация', 
      amount: '1,200.00 ₽',
      details: [
        { name: 'Охрана квартиры', amount: '800.00 ₽' },
        { name: 'Мониторинг', amount: '400.00 ₽' }
      ]
    },
    { 
      id: 'kindergarten', 
      icon: School, 
      title: 'Садик', 
      amount: '2,500.00 ₽',
      details: [
        { name: 'Питание', amount: '1,500.00 ₽' },
        { name: 'Образовательные услуги', amount: '800.00 ₽' },
        { name: 'Дополнительные занятия', amount: '200.00 ₽' }
      ]
    },
  ];

  const additionalServices = [
    { id: 'plumber', icon: Wrench, title: 'Сантехник', description: 'Ремонт и замена сантехники', fullDescription: 'Профессиональные сантехнические услуги: устранение протечек, замена и установка сантехнического оборудования, прочистка канализации, монтаж систем отопления и водоснабжения. Работаем с любыми видами сантехники и предлагаем гарантию на все виды работ.' },
    { id: 'electrician', icon: Zap, title: 'Электрик', description: 'Решение проблем с электричеством', fullDescription: 'Квалифицированные услуги электрика: диагностика и ремонт электропроводки, установка розеток и выключателей, замена электрощитов, монтаж светильников, устранение коротких замыканий. Гарантируем безопасность и соблюдение всех норм при выполнении электромонтажных работ.' },
    { id: 'cleaning', icon: Brush, title: 'Уборка', description: 'Профессиональная уборка помещений', fullDescription: 'Комплексные услуги по уборке помещений: регулярная и генеральная уборка, мытье окон и витражей, химчистка мебели и ковров, уборка после ремонта. Используем профессиональное оборудование и экологичные моющие средства для достижения идеальной чистоты.' },
    { id: 'handyman', icon: Wrench, title: 'Муж на час', description: 'Мелкий бытовой ремонт', fullDescription: 'Услуги "муж на час" для решения любых бытовых проблем: сборка и ремонт мебели, установка карнизов и полок, навеска телевизоров, замена замков, мелкий ремонт. Оперативный выезд мастера и выполнение работ любой сложности в удобное для вас время.' },
  ];
  
  const filteredServices = searchQuery.length > 0
    ? additionalServices.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : additionalServices;

  if (selectedAdditionalService) {
    const service = additionalServices.find(s => s.id === selectedAdditionalService);
    
    if (!service) return null;
    
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setSelectedAdditionalService(null)}
          >
            <ChevronRight size={24} color={PRIMARY_COLOR} style={{ transform: [{ rotate: '180deg' }] }} />
            <Text style={styles.backButtonText}>Назад</Text>
          </TouchableOpacity>
          
          <View style={styles.serviceDetailHeader}>
            <View style={[styles.cardIcon, { backgroundColor: PRIMARY_COLOR }]}>
              <service.icon size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.serviceDetailTitle}>{service.title}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.serviceFullDescription}>{service.fullDescription}</Text>
            
            <TouchableOpacity style={styles.fullWidthButton}>
              <Text style={styles.fullWidthButtonText}>Заказать</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  if (selectedService) {
    const service = services.find(s => s.id === selectedService);
    
    if (!service) return null;
    
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setSelectedService(null)}
          >
            <ChevronRight size={24} color={PRIMARY_COLOR} style={{ transform: [{ rotate: '180deg' }] }} />
            <Text style={styles.backButtonText}>Назад</Text>
          </TouchableOpacity>
          
          <View style={styles.serviceDetailHeader}>
            <View style={[styles.cardIcon, { backgroundColor: PRIMARY_COLOR }]}>
              <service.icon size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.serviceDetailTitle}>{service.title}</Text>
            <Text style={styles.serviceDetailAmount}>{service.amount}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Детализация</Text>
            {service.details.map((item, index) => (
              <View key={index} style={styles.detailItem}>
                <Text style={styles.detailName}>{item.name}</Text>
                <Text style={styles.detailAmount}>{item.amount}</Text>
              </View>
            ))}
            
            <TouchableOpacity style={styles.fullWidthButton}>
              <Text style={styles.fullWidthButtonText}>Оплатить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  if (isSearchActive) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.searchSection}>
            <View style={styles.searchContainerActive}>
              <TouchableOpacity 
                onPress={() => {
                  setIsSearchActive(false);
                  setSearchQuery('');
                }}
                style={styles.backIconContainer}
              >
                <ArrowLeft size={20} color="#1A1A1A" />
              </TouchableOpacity>
              <Search size={20} color="#8E8E93" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Найти услугу (сантехник, электрик, уборка...)"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={true}
              />
            </View>
          </View>
          
          <View style={styles.servicesResultsContainer}>
            {filteredServices.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.serviceCard}
                onPress={() => {
                  setSelectedAdditionalService(item.id);
                  setIsSearchActive(false);
                }}
              >
                <item.icon size={24} color={PRIMARY_COLOR} />
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>{item.title}</Text>
                  <Text style={styles.serviceDescription}>{item.description}</Text>
                </View>
                <ChevronRight size={24} color="#8E8E93" />
              </TouchableOpacity>
            ))}
            {filteredServices.length === 0 && searchQuery.length > 0 && (
              <Text style={styles.noResultsText}>Услуги не найдены</Text>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.searchSection}>
          <TouchableOpacity 
            style={styles.searchContainer}
            onPress={() => setIsSearchActive(true)}
          >
            <Search size={20} color="#8E8E93" style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>Найти услугу (сантехник, электрик, уборка...)</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Платежи</Text>
          <View style={styles.cardsContainer}>
            {services.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.card}
                onPress={() => setSelectedService(item.id)}
              >
                <View style={[styles.cardIcon, { backgroundColor: PRIMARY_COLOR }]}>
                  <item.icon size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.utilityAmount}>{item.amount}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.detailsText}>Посмотреть детали</Text>
                  <ChevronRight size={16} color={PRIMARY_COLOR} />
                </View>
                <TouchableOpacity style={styles.payButton}>
                  <Text style={styles.payButtonText}>Оплатить</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
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
  searchSection: {
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
    marginVertical: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  detailsText: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    marginRight: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    marginLeft: 4,
  },
  serviceDetailHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  serviceDetailTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginVertical: 8,
  },
  serviceDetailAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: PRIMARY_COLOR,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  detailName: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  detailAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: PRIMARY_COLOR,
  },
  fullWidthButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  fullWidthButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 4,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchContainerActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  backIconContainer: {
    paddingRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A1A',
  },
  searchPlaceholder: {
    flex: 1, 
    fontSize: 16,
    color: '#8E8E93',
  },
  servicesResultsContainer: {
    marginTop: 8,
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
  serviceFullDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1A1A1A',
    marginBottom: 24,
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#8E8E93',
    padding: 20,
  }
});