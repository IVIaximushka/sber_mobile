import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from './ServiceData';

const SBP_COLOR = '#FFB300';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  successModalOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 36,
    height: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#F2F2F7',
  },
  closeButtonText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: -2,
  },
  modalScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  paymentInfo: {
    marginBottom: 24,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  paymentAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: PRIMARY_COLOR,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  paymentMethodsScroll: {
    paddingVertical: 8,
    paddingBottom: 16,
  },
  paymentCard: {
    width: 180,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardBankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardBankName: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  cardType: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  cardNumber: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  selectedPaymentCard: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  sbpLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  sbpText: {
    fontSize: 14,
    fontWeight: '700',
    color: SBP_COLOR,
  },
  cardText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardSubtext: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  cardCheck: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  addCard: {
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAddIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardAddText: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    fontWeight: '500',
  },
  payButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  payButtonDisabled: {
    opacity: 0.5,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  successModalContent: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  successButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  successButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 