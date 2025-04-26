import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, BackHandler } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useNavigation } from '../../lib/navigationContext';

// Импорт данных и стилей
import { styles } from '../components/services/ServiceStyles';
import { 
  paymentServices, 
  additionalServices,
  PaymentService,
  AdditionalService 
} from '../components/services/ServiceData';

// Импорт компонентов
import { PaymentServiceCard } from '../components/services/PaymentServiceCard';
import { PaymentServiceDetails } from '../components/services/PaymentServiceDetails';
import { SearchBar } from '../components/services/SearchBar';
import { SearchResults } from '../components/services/SearchResults';
import { AdditionalServiceDetails } from '../components/services/AdditionalServiceDetails';

export default function ServicesScreen() {
  const router = useRouter();
  const customNavigation = useNavigation();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedAdditionalService, setSelectedAdditionalService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [previousScreenPath, setPreviousScreenPath] = useState<string | null>(null);
  
  const filteredServices = searchQuery.length > 0
    ? additionalServices.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : additionalServices;

  // Сохраняем предыдущий экран при монтировании компонента
  useEffect(() => {
    const path = customNavigation.getPreviousScreen();
    if (path) {
      setPreviousScreenPath(path);
    }
  }, []);

  // Настраиваем обработку кнопки "назад"
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Если открыты детали сервиса, возвращаемся к списку
        if (selectedService) {
          setSelectedService(null);
          return true;
        }
        
        // Если открыты детали доп. сервиса, возвращаемся к поиску
        if (selectedAdditionalService) {
          setSelectedAdditionalService(null);
          setIsSearchActive(true);
          return true;
        }
        
        // Если активен поиск, закрываем его
        if (isSearchActive) {
          setIsSearchActive(false);
          setSearchQuery('');
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
    }, [router, customNavigation, selectedService, selectedAdditionalService, isSearchActive])
  );

  // Обработчики событий
  const handleSelectPaymentService = (id: string) => {
    setSelectedService(id);
  };

  const handleSelectAdditionalService = (id: string) => {
    setSelectedAdditionalService(id);
    setIsSearchActive(false);
  };

  const handleBackFromPaymentService = () => {
    setSelectedService(null);
  };

  const handleBackFromAdditionalService = () => {
    setSelectedAdditionalService(null);
    setIsSearchActive(true);
  };

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleSearchBack = () => {
    setIsSearchActive(false);
    setSearchQuery('');
  };

  const handleBackButton = () => {
    // Проверяем наличие предыдущего экрана
    if (previousScreenPath) {
      router.push(previousScreenPath);
    } else {
      router.push('/(tabs)');
    }
  };

  // Отображение деталей выбранной дополнительной услуги
  if (selectedAdditionalService) {
    const service = additionalServices.find(s => s.id === selectedAdditionalService);
    if (!service) return null;
    
    return (
      <AdditionalServiceDetails
        service={service}
        onBack={handleBackFromAdditionalService}
      />
    );
  }

  // Отображение деталей выбранного платежа
  if (selectedService) {
    const service = paymentServices.find(s => s.id === selectedService);
    if (!service) return null;
    
    return (
      <PaymentServiceDetails
        service={service}
        onBack={handleBackFromPaymentService}
      />
    );
  }

  // Отображение экрана поиска
  if (isSearchActive) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <SearchBar 
            isActive={isSearchActive}
            searchQuery={searchQuery}
            onQueryChange={setSearchQuery}
            onFocus={handleSearchFocus}
            onBack={handleSearchBack}
          />
          
          <SearchResults 
            services={filteredServices}
            searchQuery={searchQuery}
            onSelectService={handleSelectAdditionalService}
          />
        </View>
      </ScrollView>
    );
  }

  // Отображение главного экрана
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <SearchBar 
          isActive={isSearchActive}
          searchQuery={searchQuery}
          onQueryChange={setSearchQuery}
          onFocus={handleSearchFocus}
          onBack={handleSearchBack}
        />
        
        <View style={styles.section}>
          <View style={styles.cardsContainer}>
            {paymentServices.map((service, index) => (
              <PaymentServiceCard 
                key={index} 
                service={service}
                onSelect={handleSelectPaymentService}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}