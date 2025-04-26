import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from './ServiceData';

export const styles = StyleSheet.create({
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
  serviceCardDetails: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  serviceCardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceCardDetailText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  serviceFullDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1A1A1A',
    marginBottom: 24,
  },
  serviceInfoContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  serviceInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceInfoLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 12,
  },
  serviceInfoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginLeft: 12,
  },
  advantagesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: PRIMARY_COLOR,
    marginBottom: 12,
  },
  advantagesList: {
    marginBottom: 16,
  },
  advantageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  advantageDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: PRIMARY_COLOR,
    marginRight: 8,
  },
  advantageText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#8E8E93',
    padding: 20,
  }
}); 