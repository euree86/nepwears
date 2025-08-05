import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// Mock backend API call
const fetchOrderData = async (orderId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    orderNumber: '224154',
    trackingNumber: 'TRK123456789',
    customerName: 'Operum England',
    orderDate: '24 Jun, 11:40',
    paymentAmount: '$30.50',
    paymentMode: 'Cash On Delivery',
    orderStatus: 'Dispatched',
    deliveryAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'London',
      postcode: 'SW1A 1AA',
      country: 'United Kingdom'
    },
    orderItems: [
      {
        id: 1,
        name: 'Pink Cotton T-shirt',
        quantity: 1,
        price: 28.00,
        image: 'https://via.placeholder.com/60x60/FFB6C1/000000?text=T-shirt'
      }
    ],
    deliveryFee: 4.50,
    promoCode: -2.00,
    totalAmount: 30.50,
    orderSteps: [
      { id: 1, title: 'Placed', completed: true },
      { id: 2, title: 'Packing', completed: true },
      { id: 3, title: 'Dispatched', completed: true },
      { id: 4, title: 'Track', completed: false },
      { id: 5, title: 'Delivered', completed: false }
    ]
  };
};

const OrderTrackingScreen = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrderData();
  }, []);

  const loadOrderData = async () => {
    try {
      const data = await fetchOrderData('224154');
      setOrderData(data);
    } catch (error) {
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStepIcon = (step) => {
    if (step.completed) {
      return '✓';
    }
    return '';
  };

  const getStepColor = (step) => {
    if (step.completed) {
      return '#FC0079';
    }
    return '#E5E7EB';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FC0079" />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  if (!orderData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load order data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.productInfo}>
          <Image 
            source={{ uri: orderData.orderItems[0].image }} 
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{orderData.orderItems[0].name}</Text>
            <Text style={styles.customerName}>{orderData.customerName}</Text>
            <Text style={styles.orderDate}>Ordered on {orderData.orderDate}</Text>
            <Text style={styles.orderNumber}>Order ID {orderData.orderNumber}</Text>
            <Text style={styles.trackingNumber}>Tracking: {orderData.trackingNumber}</Text>
          </View>
        </View>
        
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentAmount}>{orderData.paymentAmount}</Text>
          <Text style={styles.paymentMode}>{orderData.paymentMode}</Text>
          <Text style={[styles.orderStatus, { color: '#FC0079' }]}>
            {orderData.orderStatus}
          </Text>
        </View>
      </View>

      {/* Delivery Address */}
      <View style={styles.addressSection}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.addressName}>{orderData.deliveryAddress.name}</Text>
          <Text style={styles.addressText}>{orderData.deliveryAddress.street}</Text>
          <Text style={styles.addressText}>
            {orderData.deliveryAddress.city}, {orderData.deliveryAddress.postcode}
          </Text>
          <Text style={styles.addressText}>{orderData.deliveryAddress.country}</Text>
        </View>
      </View>

      {/* Order Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressContainer}>
          {orderData.orderSteps.map((step, index) => (
            <View key={step.id} style={styles.progressStep}>
              <View style={[
                styles.stepCircle, 
                { backgroundColor: getStepColor(step) }
              ]}>
                <Text style={[
                  styles.stepIcon,
                  { color: step.completed ? 'white' : '#9CA3AF' }
                ]}>
                  {getStepIcon(step)}
                </Text>
              </View>
              <Text style={[
                styles.stepTitle,
                { color: step.completed ? '#374151' : '#9CA3AF' }
              ]}>
                {step.title}
              </Text>
              {index < orderData.orderSteps.length - 1 && (
                <View style={[
                  styles.stepConnector,
                  { backgroundColor: step.completed ? '#FC0079' : '#E5E7EB' }
                ]} />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Order Summary */}
      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Ordered Item(s)</Text>
        
        {orderData.orderItems.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        ))}
        
        <View style={styles.itemRow}>
          <Text style={styles.itemName}>Qty: {orderData.orderItems[0].quantity}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.itemRow}>
          <Text style={styles.itemName}>Delivery Fee</Text>
          <Text style={styles.itemPrice}>${orderData.deliveryFee.toFixed(2)}</Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemName}>Promo code</Text>
          <Text style={styles.itemPrice}>-${Math.abs(orderData.promoCode).toFixed(2)}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.itemRow}>
          <Text style={styles.totalText}>Amount to Pay</Text>
          <Text style={styles.totalAmount}>${orderData.totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.trackButtonText}>Track Package</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.supportButton}>
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  orderNumber: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  trackingNumber: {
    fontSize: 12,
    color: '#FC0079',
    fontWeight: '500',
  },
  paymentInfo: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  paymentMode: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  addressSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  addressContainer: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
  },
  addressName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  progressSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepIcon: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  stepConnector: {
    position: 'absolute',
    top: 16,
    left: '60%',
    right: '-40%',
    height: 2,
    zIndex: -1,
  },
  summarySection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemName: {
    fontSize: 14,
    color: '#374151',
  },
  itemPrice: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  buttonContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  trackButton: {
    flex: 1,
    backgroundColor: '#FC0079',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  supportButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OrderTrackingScreen;