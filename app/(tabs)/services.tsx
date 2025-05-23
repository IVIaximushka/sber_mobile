import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

// Импорт данных и стилей
import { styles } from '@/app/components/services/ServiceStyles';
import { 
  paymentServices as initialPaymentServices, 
  additionalServices,
  PaymentService,
  AdditionalService 
} from '../components/services/ServiceData';

// Импорт компонентов
import { PaymentServiceCard } from '@/app/components/services/PaymentServiceCard';
import { PaymentServiceDetails } from '@/app/components/services/PaymentServiceDetails';
import { SearchBar } from '@/app/components/services/SearchBar';
import { SearchResults } from '@/app/components/services/SearchResults';
import { AdditionalServiceDetails } from '@/app/components/services/AdditionalServiceDetails';

export default function ServicesScreen() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedAdditionalService, setSelectedAdditionalService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [paymentServices, setPaymentServices] = useState<PaymentService[]>(initialPaymentServices);
  
  const filteredServices = searchQuery.length > 0
    ? additionalServices.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : additionalServices;

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

  const handlePaymentStatusChange = (id: string, isPaid: boolean, paymentMethod: 'card' | 'sber') => {
    setPaymentServices(prevServices =>
      prevServices.map(service =>
        service.id === id ? { ...service, isPaid, paymentMethod } : service
      )
    );
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
        onPaymentStatusChange={handlePaymentStatusChange}
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
                onPaymentStatusChange={handlePaymentStatusChange}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}