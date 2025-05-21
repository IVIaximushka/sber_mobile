import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Heart, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { PaymentPage } from '../payment/PaymentPage';

const PRIMARY_COLOR = '#8B1E3F';

interface DonationsScreenProps {
  onBackPress?: () => void;
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  image: any;
}

const initialCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Ремонт домофона',
    description: 'Сбор средств на ремонт и модернизацию системы домофона',
    targetAmount: 50000,
    currentAmount: 35000,
    image: require('../../../assets/images/intercom.jpg'),
  },
  {
    id: '2',
    title: 'Установка видеокамер',
    description: 'Сбор средств на установку системы видеонаблюдения в подъезде',
    targetAmount: 100000,
    currentAmount: 45000,
    image: require('../../../assets/images/camera.jpg'),
  },
  {
    id: '3',
    title: 'Благоустройство территории',
    description: 'Сбор средств на установку новых скамеек и урн во дворе',
    targetAmount: 75000,
    currentAmount: 60000,
    image: require('../../../assets/images/yard.jpg'),
  },
];

function Donations({ onBackPress }: DonationsScreenProps) {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const handleDonate = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsPaymentVisible(true);
  };

  const handlePaymentComplete = (amount: number) => {
    if (selectedCampaign) {
      setCampaigns(prevCampaigns => 
        prevCampaigns.map(campaign => 
          campaign.id === selectedCampaign.id
            ? { ...campaign, currentAmount: campaign.currentAmount + amount }
            : campaign
        )
      );
    }
  };

  if (isPaymentVisible && selectedCampaign) {
    return (
      <PaymentPage
        onBackPress={() => setIsPaymentVisible(false)}
        amount={selectedCampaign.targetAmount}
        currentAmount={selectedCampaign.currentAmount}
        title={selectedCampaign.title}
        onDonationComplete={handlePaymentComplete}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Сборы и пожертвования</Text>
      </View>

      <ScrollView style={styles.content}>
        {campaigns.map((campaign) => {
          const progress = (campaign.currentAmount / campaign.targetAmount) * 100;
          const isCompleted = campaign.currentAmount >= campaign.targetAmount;
          
          return (
            <View key={campaign.id} style={styles.donationCard}>
              <Image source={campaign.image} style={styles.donationImage} />
              {isCompleted && (
                <View style={styles.completedBanner}>
                  <Text style={styles.completedText}>Сбор завершен</Text>
                </View>
              )}
              <View style={styles.donationContent}>
                <Text style={styles.donationTitle}>{campaign.title}</Text>
                <Text style={styles.donationDescription}>
                  {campaign.description}
                </Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[
                      styles.progressFill, 
                      { width: `${Math.min(progress, 100)}%` },
                      isCompleted && styles.progressFillCompleted
                    ]} />
                  </View>
                  <Text style={[
                    styles.progressText,
                    isCompleted && styles.progressTextCompleted
                  ]}>
                    {isCompleted ? '100' : Math.round(progress)}%
                  </Text>
                </View>
                <View style={styles.amountContainer}>
                  <Text style={[
                    styles.currentAmount,
                    isCompleted && styles.currentAmountCompleted
                  ]}>
                    {campaign.currentAmount.toLocaleString()} ₽
                  </Text>
                  <Text style={styles.targetAmount}>
                    из {campaign.targetAmount.toLocaleString()} ₽
                  </Text>
                </View>
                <TouchableOpacity 
                  style={[
                    styles.donateButton,
                    isCompleted && styles.donateButtonCompleted
                  ]}
                  onPress={() => handleDonate(campaign)}
                  disabled={isCompleted}>
                  <Text style={styles.donateButtonText}>
                    {isCompleted ? 'Сбор завершен' : 'Пожертвовать'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
  donationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
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
    height: 200,
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
    marginBottom: 16,
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
  progressFillCompleted: {
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  progressTextCompleted: {
    color: '#4CAF50',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  currentAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: PRIMARY_COLOR,
    marginRight: 4,
  },
  currentAmountCompleted: {
    color: '#4CAF50',
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
  donateButtonCompleted: {
    backgroundColor: '#4CAF50',
  },
  donateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  completedBanner: {
    position: 'absolute',
    top: 16,
    right: 0,
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  completedText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});

export { Donations };
export default Donations; 