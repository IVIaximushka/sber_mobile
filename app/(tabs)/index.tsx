import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, ImageBackground, Modal, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Bell, ChevronRight, Calendar, Clock, MapPin, Users, Store, Utensils, Dumbbell, Scissors, ChevronLeft, AlertTriangle, Droplet, Zap, Flame, Home, Building2, Percent, ThumbsUp, ThumbsDown, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const PRIMARY_COLOR = '#8B1E3F';
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
    image: require('../../assets/images/playground.jpg'),
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
    image: require('../../assets/images/bike.jpg'),
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
    image: require('../../assets/images/cleaning.jpg'),
  },
];

const fundraisingCampaigns = [
  {
    id: '1',
    title: 'Ремонт домофона',
    description: 'Сбор средств на ремонт и модернизацию системы домофона',
    targetAmount: 50000,
    currentAmount: 35000,
    image: require('../../assets/images/intercom.jpg'),
  },
  {
    id: '2',
    title: 'Установка видеокамер',
    description: 'Сбор средств на установку системы видеонаблюдения в подъезде',
    targetAmount: 100000,
    currentAmount: 45000,
    image: require('../../assets/images/camera.jpg'),
  },
  {
    id: '3',
    title: 'Благоустройство территории',
    description: 'Сбор средств на установку новых скамеек и урн во дворе',
    targetAmount: 75000,
    currentAmount: 60000,
    image: require('../../assets/images/yard.jpg'),
  },
];

type Styles = {
  container: ViewStyle;
  headerBackground: ViewStyle;
  headerOverlay: ViewStyle;
  header: ViewStyle;
  userInfo: ViewStyle;
  avatarPlaceholder: ViewStyle;
  avatarText: TextStyle;
  userTextContainer: ViewStyle;
  greeting: TextStyle;
  userName: TextStyle;
  notificationButton: ViewStyle;
  notificationBadge: ViewStyle;
  notificationText: TextStyle;
  servicesContainer: ViewStyle;
  servicesHeader: ViewStyle;
  sectionTitle: TextStyle;
  viewAllButton: ViewStyle;
  viewAllText: TextStyle;
  servicesScroll: ViewStyle;
  serviceCard: ViewStyle;
  serviceImage: ImageStyle;
  serviceContent: ViewStyle;
  serviceTitle: TextStyle;
  serviceDistance: TextStyle;
  scrollButton: ViewStyle;
  scrollLeft: ViewStyle;
  detailItem: ViewStyle;
  detailText: TextStyle;
  emergenciesContainer: ViewStyle;
  emergenciesHeader: ViewStyle;
  emergenciesTitle: TextStyle;
  emergencyCard: ViewStyle;
  emergencyIconContainer: ViewStyle;
  emergencyContent: ViewStyle;
  emergencyTitle: TextStyle;
  emergencyDescription: TextStyle;
  emergencyDetails: ViewStyle;
  section: ViewStyle;
  sectionHeader: ViewStyle;
  sectionTitleContainer: ViewStyle;
  seeAllButton: ViewStyle;
  scrollView: ViewStyle;
  card: ViewStyle;
  cardImage: ImageStyle;
  cardContent: ViewStyle;
  cardTitle: TextStyle;
  cardPrice: TextStyle;
  cardDetails: TextStyle;
  cardAddress: TextStyle;
  cardDate: TextStyle;
  cardDescription: TextStyle;
  cardDistance: TextStyle;
  discountContainer: ViewStyle;
  discountText: TextStyle;
  discountLabel: TextStyle;
  proposalsContainer: ViewStyle;
  proposalsScroll: ViewStyle;
  proposalCard: ViewStyle;
  proposalImage: ImageStyle;
  proposalContent: ViewStyle;
  proposalTitle: TextStyle;
  proposalDescription: TextStyle;
  proposalDetails: ViewStyle;
  votingContainer: ViewStyle;
  voteCounts: ViewStyle;
  voteCountText: TextStyle;
  voteButtons: ViewStyle;
  voteButton: ViewStyle;
  voteForButton: ViewStyle;
  voteAgainstButton: ViewStyle;
  votedForButton: ViewStyle;
  votedAgainstButton: ViewStyle;
  modalOverlay: ViewStyle;
  modalContent: ViewStyle;
  modalImage: ImageStyle;
  modalHeader: ViewStyle;
  modalTitle: TextStyle;
  closeButton: ViewStyle;
  closeButtonText: TextStyle;
  modalScroll: ViewStyle;
  modalInfo: ViewStyle;
  modalDetailItem: ViewStyle;
  modalDetailText: TextStyle;
  modalDescription: TextStyle;
  modalVoting: ViewStyle;
  modalVotingTitle: TextStyle;
  modalVoteCounts: ViewStyle;
  modalVoteCount: TextStyle;
  modalVoteButtons: ViewStyle;
  modalVoteButton: ViewStyle;
  modalVoteButtonText: TextStyle;
  modalVoteButtonTextActive: TextStyle;
  donationsContainer: ViewStyle;
  donationsScroll: ViewStyle;
  donationCard: ViewStyle;
  donationImage: ImageStyle;
  donationContent: ViewStyle;
  donationTitle: TextStyle;
  donationDescription: TextStyle;
  progressContainer: ViewStyle;
  progressBar: ViewStyle;
  progressFill: ViewStyle;
  progressText: TextStyle;
  amountContainer: ViewStyle;
  currentAmount: TextStyle;
  targetAmount: TextStyle;
  donateButton: ViewStyle;
  donateButtonText: TextStyle;
  divider: ViewStyle;
};

export default function HomeScreen() {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [proposalVotes, setProposalVotes] = useState<Record<string, 'for' | 'against' | null>>({});
  const [selectedProposal, setSelectedProposal] = useState<typeof residentProposals[0] | null>(null);

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

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/street.jpg')}
        style={styles.headerBackground}
      >
        <View style={styles.headerOverlay}>
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>АИ</Text>
              </View>
              <View style={styles.userTextContainer}>
                <Text style={[styles.greeting, { color: '#FFFFFF' }]}>Добрый день,</Text>
                <Text style={[styles.userName, { color: '#FFFFFF' }]}>Анна Иванова</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => router.push('/notifications')}>
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
      <View style={styles.divider} />

      <View style={styles.servicesContainer}>
        <View style={styles.servicesHeader}>
          <Text style={styles.sectionTitle}>Акции и скидки</Text>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/nearby')}>
            <Text style={styles.viewAllText}>Посмотреть</Text>
            <ChevronRight size={20} color="#FFFFFF" />
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
            style={styles.seeAllButton}>
            <ChevronRight size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.donationsScroll}>
          {fundraisingCampaigns.map((campaign) => {
            const progress = (campaign.currentAmount / campaign.targetAmount) * 100;
            return (
              <TouchableOpacity 
                key={campaign.id} 
                style={styles.donationCard}>
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
                  <TouchableOpacity style={styles.donateButton}>
                    <Text style={styles.donateButtonText}>Пожертвовать</Text>
                  </TouchableOpacity>
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
            onPress={() => router.push('/proposals')}>
            <ChevronRight size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.proposalsScroll}>
          {residentProposals.map((proposal) => (
            <TouchableOpacity 
              key={proposal.id} 
              style={styles.proposalCard}
              onPress={() => handleProposalPress(proposal)}>
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
                <ScrollView style={styles.modalScroll}>
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

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBackground: {
    width: '100%',
    height: 140,
  },
  headerOverlay: {
    backgroundColor: 'rgba(107, 3, 34, 0.59)',
    height: '100%',
    padding: 20,
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    fontSize: 18,
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
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
    backgroundColor: 'rgba(255, 200, 200, 0.36)',
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
    color: PRIMARY_COLOR,
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  viewAllText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  servicesScroll: {
    flexGrow: 0,
  },
  serviceCard: {
    width: width * 0.4,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  serviceImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  serviceContent: {
    padding: 12,
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
    shadowColor: '#5a2a37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scrollLeft: {
    left: 10,
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
    backgroundColor: 'pink',
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'red',
  },
  emergencyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: `${PRIMARY_COLOR}20`,
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
    backgroundColor: 'rgba(255, 200, 200, 0.7)',
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginBottom: 0,
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
  scrollView: {
    paddingLeft: 16,
  },
  card: {
    width: width * 0.7,
    backgroundColor: '#FFFFFF',
    marginRight: 16,
    borderRadius: 12,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: PRIMARY_COLOR,
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
    color: '#1A1A1A',
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
  proposalsContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  proposalsScroll: {
    marginTop: 16,
  },
  proposalCard: {
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  proposalImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  proposalContent: {
    padding: 16,
  },
  proposalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  proposalDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  proposalDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  votingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 12,
  },
  voteCounts: {
    flexDirection: 'row',
    gap: 12,
  },
  voteCountText: {
    fontSize: 14,
    color: '#666666',
  },
  voteButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  voteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  voteForButton: {
    borderColor: PRIMARY_COLOR,
    backgroundColor: 'rgba(139, 30, 63, 0.1)',
  },
  voteAgainstButton: {
    borderColor: PRIMARY_COLOR,
    backgroundColor: 'rgba(139, 30, 63, 0.1)',
  },
  votedForButton: {
    backgroundColor: PRIMARY_COLOR,
  },
  votedAgainstButton: {
    backgroundColor: PRIMARY_COLOR,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#8E8E93',
  },
  modalScroll: {
    padding: 16,
  },
  modalInfo: {
    marginBottom: 16,
  },
  modalDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalDetailText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalVoting: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
  },
  modalVotingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  modalVoteCounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalVoteCount: {
    fontSize: 16,
    color: '#666666',
  },
  modalVoteButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalVoteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  modalVoteButtonText: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontWeight: '500',
  },
  modalVoteButtonTextActive: {
    color: '#FFFFFF',
  },
  donationsContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  donationsScroll: {
    marginTop: 16,
  },
  donationCard: {
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  donationImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  donationContent: {
    padding: 16,
  },
  donationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  donationDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  currentAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: PRIMARY_COLOR,
    marginRight: 4,
  },
  targetAmount: {
    fontSize: 14,
    color: '#8E8E93',
  },
  donateButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  donateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 2,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
  },
});