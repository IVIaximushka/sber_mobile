import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, ImageBackground, Modal, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Bell, ChevronRight, Calendar, Clock, MapPin, Users, Store, Utensils, Dumbbell, Scissors, ChevronLeft, AlertTriangle, Droplet, Zap, Flame, Home, Building2, Percent, ThumbsUp, ThumbsDown, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';

// Импорт компонентов для навигации
import NearbyScreen from '@/app/components/index/nearby';
import ProposalsScreen from '@/app/components/index/proposals';
import NotificationsScreen from '@/app/components/index/notifications';
import DonationsScreen from '@/app/components/index/donations';

import { PRIMARY_COLOR, styles, Styles } from '../components/index/indexStyle';

const { width } = Dimensions.get('window');

const nearbyServices = [
  {
    id: '1',
    title: 'Магнит',
    type: 'store',
    distance: '0.2 км',
    address: 'ул. Ленина, 10',
    image: require('@/assets/images/magnit.jpg'),
  },
  {
    id: '2',
    title: 'Пятерочка',
    type: 'store',
    distance: '0.3 км',
    address: 'ул. Ленина, 15',
    image: require('@/assets/images/pyaterochka.jpg'),
  },
  {
    id: '3',
    title: 'Суши Роллы',
    type: 'restaurant',
    distance: '0.5 км',
    address: 'ул. Ленина, 20',
    image: require('@/assets/images/sushi.jpg'),
  },
  {
    id: '4',
    title: 'Салон красоты Оксана',
    type: 'beauty',
    distance: '0.4 км',
    address: 'ул. Ленина, 25',
    image: require('@/assets/images/salon.jpg'),
  },
];

const residentProposals = [
  {
    id: '1',
    title: 'Ремонт детской площадки',
    description: 'Предлагаю обновить детскую площадку: установить новые качели, горки и песочницу. Сейчас оборудование устарело и требует замены.',
    author: 'Анна Петрова',
    date: '15.03.2024',
    votesFor: 45,
    votesAgainst: 12,
    status: 'active',
    image: require('@/assets/images/playground.jpg'),
  },
  {
    id: '2',
    title: 'Установка велопарковки',
    description: 'Нужно оборудовать специальную парковку для велосипедов у входа в дом. Сейчас велосипеды привязывают к деревьям и фонарям.',
    author: 'Михаил Иванов',
    date: '14.03.2024',
    votesFor: 38,
    votesAgainst: 15,
    status: 'active',
    image: require('@/assets/images/bike.jpg'),
  },
  {
    id: '3',
    title: 'Организация субботника',
    description: 'Предлагаю организовать субботник для уборки территории вокруг дома в следующую субботу. Нужны волонтеры для участия.',
    author: 'Елена Сидорова',
    date: '13.03.2024',
    votesFor: 52,
    votesAgainst: 8,
    status: 'active',
    image: require('@/assets/images/cleaning.jpg'),
  },
];

const fundraisingCampaigns = [
  {
    id: '1',
    title: 'Ремонт домофона',
    description: 'Сбор средств на ремонт и модернизацию системы домофона',
    targetAmount: 50000,
    currentAmount: 35000,
    image: require('@/assets/images/intercom.jpg'),
  },
  {
    id: '2',
    title: 'Установка видеокамер',
    description: 'Сбор средств на установку системы видеонаблюдения в подъезде',
    targetAmount: 100000,
    currentAmount: 45000,
    image: require('@/assets/images/camera.jpg'),
  },
  {
    id: '3',
    title: 'Благоустройство территории',
    description: 'Сбор средств на установку новых скамеек и урн во дворе',
    targetAmount: 75000,
    currentAmount: 60000,
    image: require('@/assets/images/yard.jpg'),
  },
];

type ScreenType = 'home' | 'nearby' | 'proposals' | 'notifications' | 'donations';

export default function HomeScreen() {
  const router = useRouter();
  const { state, getProfile } = useAuth();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [proposalVotes, setProposalVotes] = useState<Record<string, 'for' | 'against' | null>>({});
  const [selectedProposal, setSelectedProposal] = useState<typeof residentProposals[0] | null>(null);
  const [profileData, setProfileData] = useState<{username?: string}>({});
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile();
        if (profile) {
          setProfileData({
            username: profile.username
          });
        }
      } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
      }
    }

    loadProfile();
  }, [getProfile]);

  // Используем данные профиля
  const userName = profileData.username || state.user?.user_metadata?.username || 'Пользователь';
  
  // Получаем инициалы для аватара
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

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
    {
      id: 3,
      title: 'Неоплаченные счета',
      description: 'У вас есть неоплаченные счета за коммунальные услуги',
      type: 'payment',
      icon: Percent,
      color: '#FFE5E5',
    },
  ];

  const handleNavigateToNearby = () => {
    setCurrentScreen('nearby');
  };

  const handleNavigateToProposals = () => {
    setCurrentScreen('proposals');
  };

  const handleNavigateToNotifications = () => {
    setCurrentScreen('notifications');
  };

  const handleNavigateToDonations = () => {
    setCurrentScreen('donations');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const renderSection = (title: string, items: any[], icon: any, onPress: () => void) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          {icon}
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.seeAllButton}>
          <ChevronRight size={20} color={PRIMARY_COLOR} />
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

  const handleVote = (proposalId: string, vote: 'for' | 'against') => {
    setProposalVotes(prev => ({
      ...prev,
      [proposalId]: vote
    }));
  };

  const handleProposalPress = (proposal: typeof residentProposals[0]) => {
    setSelectedProposal(proposal);
  };

  const closeModal = () => {
    setSelectedProposal(null);
  };

  // Рендерим разные экраны в зависимости от текущего состояния
  if (currentScreen === 'nearby') {
    return <NearbyScreen onBackPress={handleBackToHome} />;
  }

  if (currentScreen === 'proposals') {
    return <ProposalsScreen onBackPress={handleBackToHome} />;
  }

  if (currentScreen === 'notifications') {
    return <NotificationsScreen onBackPress={handleBackToHome} />;
  }

  if (currentScreen === 'donations') {
    return <DonationsScreen onBackPress={handleBackToHome} />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} overScrollMode="never">
      <ImageBackground
        source={require('../../assets/images/street.jpg')}
        style={styles.headerBackground}
      >
        <View style={styles.headerOverlay}>
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{getInitials(userName)}</Text>
              </View>
              <View style={styles.userTextContainer}>
                <Text style={[styles.greeting, { color: '#FFFFFF' }]}>Добрый день,</Text>
                <Text style={[styles.userName, { color: '#FFFFFF' }]}>{userName}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={handleNavigateToNotifications}>
              <Bell size={24} color="#FFFFFF" />
              <View style={[styles.notificationBadge, { backgroundColor: '#FF3B30' }]}>
                <Text style={styles.notificationText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {emergencies.length > 0 && (
        <View style={styles.emergenciesContainer}>
          <View style={styles.emergenciesHeader}>
            <AlertTriangle size={24} color="#FF3B30" />
            <Text style={styles.emergenciesTitle}>Важные события</Text>
          </View>
          {emergencies.map((emergency) => (
            <View key={emergency.id} style={styles.emergencyCard}>
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
            </View>
          ))}
        </View>
      )}
      <View style={styles.divider} />

      <View style={styles.servicesContainer}>
        <View style={styles.servicesHeader}>
          <Text style={styles.sectionTitle}>Акции и скидки</Text>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={handleNavigateToNearby}>
            <Text style={styles.viewAllText}>Посмотреть</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          style={styles.servicesScroll}
          onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
          scrollEventThrottle={16}>
          {nearbyServices.map((service) => (
            <TouchableOpacity 
              key={service.id} 
              style={styles.serviceCard}
              onPress={handleNavigateToNearby}>
              <Image source={service.image} style={styles.serviceImage} />
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDistance}>{service.distance}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.divider} />

      <View style={styles.donationsContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Heart size={20} color={PRIMARY_COLOR} />
            <Text style={styles.sectionTitle}>Сборы и пожертвования</Text>
          </View>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={handleNavigateToDonations}>
            <ChevronRight size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          style={styles.donationsScroll}>
          {fundraisingCampaigns.map((campaign) => {
            const progress = (campaign.currentAmount / campaign.targetAmount) * 100;
            return (
              <TouchableOpacity 
                key={campaign.id} 
                style={styles.donationCard}
                onPress={handleNavigateToDonations}>
                <Image source={campaign.image} style={styles.donationImage} />
                <View style={styles.donationContent}>
                  <Text style={styles.donationTitle}>{campaign.title}</Text>
                  <Text style={styles.donationDescription} numberOfLines={2}>
                    {campaign.description}
                  </Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                  </View>
                  <View style={styles.amountContainer}>
                    <Text style={styles.currentAmount}>
                      {campaign.currentAmount.toLocaleString()} ₽
                    </Text>
                    <Text style={styles.targetAmount}>
                      из {campaign.targetAmount.toLocaleString()} ₽
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.divider} />

      <View style={styles.proposalsContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Users size={20} color={PRIMARY_COLOR} />
            <Text style={styles.sectionTitle}>Предложения жильцов</Text>
          </View>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={handleNavigateToProposals}>
            <ChevronRight size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          style={styles.proposalsScroll}>
          {residentProposals.map((proposal) => (
            <TouchableOpacity 
              key={proposal.id} 
              style={styles.proposalCard}
              onPress={handleNavigateToProposals}>
              <Image source={proposal.image} style={styles.proposalImage} />
              <View style={styles.proposalContent}>
                <Text style={styles.proposalTitle}>{proposal.title}</Text>
                <Text style={styles.proposalDescription} numberOfLines={2}>{proposal.description}</Text>
                <View style={styles.proposalDetails}>
                  <View style={styles.detailItem}>
                    <Users size={16} color="#8E8E93" />
                    <Text style={styles.detailText}>{proposal.author}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Calendar size={16} color="#8E8E93" />
                    <Text style={styles.detailText}>{proposal.date}</Text>
                  </View>
                </View>
                <View style={styles.votingContainer}>
                  <View style={styles.voteCounts}>
                    <Text style={styles.voteCountText}>За: {proposal.votesFor}</Text>
                    <Text style={styles.voteCountText}>Против: {proposal.votesAgainst}</Text>
                  </View>
                  <View style={styles.voteButtons}>
                    <TouchableOpacity 
                      style={[
                        styles.voteButton, 
                        styles.voteForButton,
                        proposalVotes[proposal.id] === 'for' && styles.votedForButton
                      ]}
                      onPress={() => handleVote(proposal.id, 'for')}>
                      <ThumbsUp size={18} color={proposalVotes[proposal.id] === 'for' ? '#FFFFFF' : PRIMARY_COLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.voteButton, 
                        styles.voteAgainstButton,
                        proposalVotes[proposal.id] === 'against' && styles.votedAgainstButton
                      ]}
                      onPress={() => handleVote(proposal.id, 'against')}>
                      <ThumbsDown size={18} color={proposalVotes[proposal.id] === 'against' ? '#FFFFFF' : PRIMARY_COLOR} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Modal
        visible={selectedProposal !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedProposal && (
              <>
                <Image source={selectedProposal.image} style={styles.modalImage} />
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedProposal.title}</Text>
                  <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false} overScrollMode="never">
                  <View style={styles.modalInfo}>
                    <View style={styles.modalDetailItem}>
                      <Users size={16} color="#8E8E93" />
                      <Text style={styles.modalDetailText}>Автор: {selectedProposal.author}</Text>
                    </View>
                    <View style={styles.modalDetailItem}>
                      <Calendar size={16} color="#8E8E93" />
                      <Text style={styles.modalDetailText}>Дата: {selectedProposal.date}</Text>
                    </View>
                    <View style={styles.modalDetailItem}>
                      <Text style={styles.modalDetailText}>Статус: {selectedProposal.status === 'active' ? 'Активно' : 'Завершено'}</Text>
                    </View>
                  </View>
                  <Text style={styles.modalDescription}>{selectedProposal.description}</Text>
                  <View style={styles.modalVoting}>
                    <Text style={styles.modalVotingTitle}>Голосование</Text>
                    <View style={styles.modalVoteCounts}>
                      <Text style={styles.modalVoteCount}>За: {selectedProposal.votesFor}</Text>
                      <Text style={styles.modalVoteCount}>Против: {selectedProposal.votesAgainst}</Text>
                    </View>
                    <View style={styles.modalVoteButtons}>
                      <TouchableOpacity 
                        style={[
                          styles.modalVoteButton,
                          styles.voteForButton,
                          proposalVotes[selectedProposal.id] === 'for' && styles.votedForButton
                        ]}
                        onPress={() => handleVote(selectedProposal.id, 'for')}>
                        <ThumbsUp size={20} color={proposalVotes[selectedProposal.id] === 'for' ? '#FFFFFF' : PRIMARY_COLOR} />
                        <Text style={[
                          styles.modalVoteButtonText,
                          proposalVotes[selectedProposal.id] === 'for' && styles.modalVoteButtonTextActive
                        ]}>Поддержать</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[
                          styles.modalVoteButton,
                          styles.voteAgainstButton,
                          proposalVotes[selectedProposal.id] === 'against' && styles.votedAgainstButton
                        ]}
                        onPress={() => handleVote(selectedProposal.id, 'against')}>
                        <ThumbsDown size={20} color={proposalVotes[selectedProposal.id] === 'against' ? '#FFFFFF' : PRIMARY_COLOR} />
                        <Text style={[
                          styles.modalVoteButtonText,
                          proposalVotes[selectedProposal.id] === 'against' && styles.modalVoteButtonTextActive
                        ]}>Отклонить</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}