import { StyleSheet, Dimensions } from 'react-native';
import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export const PRIMARY_COLOR = '#8B1E3F';
const { width } = Dimensions.get('window');

export type Styles = {
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

export const styles = StyleSheet.create<Styles>({
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
    marginTop: 16,
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    marginTop: 16,
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