import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Header from "./components/header"
const { height: screenHeight } = Dimensions.get('window');

const App = () => {
  const membershipTiers = [
    {
      id: 1,
      name: 'Silver',
      subtitle: 'Essential',
      color: '#C0C0C0',
      benefits: [
        '100 points = 5% discount',
        '500 points = 10% discount',
        '1000 points = 15% discount'
      ]
    },
    {
      id: 2,
      name: 'Gold',
      subtitle: 'Premium',
      color: '#FFD700',
      benefits: [
        '100 points = 8% discount',
        '500 points = 15% discount',
        '1000 points = 20% discount'
      ]
    },
    {
      id: 3,
      name: 'Platinum',
      subtitle: 'VIP Elite',
      color: '#E5E4E2',
      benefits: [
        '100 points = 12% discount',
        '500 points = 20% discount',
        '1000 points = 25% discount'
      ]
    }
  ];

  const MembershipCard = ({ membership }) => (

    <View style={styles.membershipCard}>
      <Header title="Membership" />
      <View style={styles.cardHeader}>
        <View style={[styles.colorIndicator, { backgroundColor: membership.color }]} />
        <View style={styles.titleContainer}>
          <Text style={styles.membershipName}>{membership.name}</Text>
          <Text style={styles.membershipSubtitle}>{membership.subtitle}</Text>
        </View>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>FREE</Text>
        </View>
      </View>

      <View style={styles.benefitsContainer}>
        {membership.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitRow}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <View style={styles.header}>
        <Text style={styles.title}>Membership Tiers</Text>
        <Text style={styles.subtitle}>
          Earn points with every purchase and unlock bigger discounts!
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        {membershipTiers.map((membership) => (
          <MembershipCard key={membership.id} membership={membership} />
        ))}
      </View>

      <TouchableOpacity style={styles.membershipButton}>
        <Text style={styles.membershipButtonText}>GET MEMBERSHIP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 18,
  },
  cardsContainer: {
    flex: 1,
    gap: 12,
    paddingBottom: 20,
  },
  membershipCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f3f4',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
  },
  membershipName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  membershipSubtitle: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  badgeContainer: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  benefitsContainer: {
    gap: 6,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 12,
    color: '#27ae60',
    fontWeight: 'bold',
    marginRight: 8,
    width: 12,
  },
  benefitText: {
    fontSize: 12,
    color: '#5a6c7d',
    flex: 1,
    lineHeight: 16,
  },
  membershipButton: {
    backgroundColor: '#ff9500',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#ff9500',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  membershipButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
});

export default App;