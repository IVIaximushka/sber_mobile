import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { Users, Calendar, ThumbsUp, ThumbsDown, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useNavigation } from '../lib/navigationContext';

const PRIMARY_COLOR = '#8B1E3F';

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
    image: require('../assets/images/playground.jpg'),
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
    image: require('../assets/images/bike.jpg'),
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
    image: require('../assets/images/cleaning.jpg'),
  },
];

export default function ProposalsScreen() {
  const router = useRouter();
  const customNavigation = useNavigation();
  const [selectedProposal, setSelectedProposal] = useState<typeof residentProposals[0] | null>(null);
  const [proposalVotes, setProposalVotes] = useState<Record<string, 'for' | 'against' | null>>({});

  // Настраиваем обработку кнопки "назад"
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Если открыто модальное окно, закрываем его
        if (selectedProposal) {
          setSelectedProposal(null);
          return true;
        }
        
        // Иначе используем историю навигации
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
    }, [router, customNavigation, selectedProposal])
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Предложения жильцов</Text>
      </View>

      <ScrollView style={styles.content}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  proposalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
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
}); 