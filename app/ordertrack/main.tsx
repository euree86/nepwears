import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

import OrderHeader from './orderheader';
import DeliveryAddressCard from './deliveryaddress';
import OrderProgressTracker from './orderprogess';
import OrderSummary from './ordersummary';
import ActionButtons from './actionbutton';
import Header from "../components/header";
// Define interfaces for data shapes

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface DeliveryAddress {
  name: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
}

interface OrderStep {
  id: number;
  title: string;
  completed: boolean;
}

interface OrderData {
  orderNumber: string;
  trackingNumber: string;
  customerName: string;
  orderDate: string;
  paymentAmount: string; // Could be number if you want
  paymentMode: string;
  orderStatus: string;
  deliveryAddress: DeliveryAddress;
  orderItems: OrderItem[];
  deliveryFee: number;
  promoCode: string;
  totalAmount: number;
  orderSteps: OrderStep[];
}

// Mock backend API call with typed return
const fetchOrderData = async (orderId: string): Promise<OrderData> => {
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
        price: 28.0,
        image: 'https://cdn.pixabay.com/photo/2025/07/20/07/37/hand-9723837_640.jpg'
      }
    ],
    deliveryFee: 4.5,
    promoCode: "-2.0",
    totalAmount: 30.5,
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
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const loadOrderData = async () => {
      const data = await fetchOrderData('224154');
      setOrderData(data);
    };
    loadOrderData();
  }, []);

  if (!orderData) return null; // or loading indicator

  return (
    <ScrollView style={{ flex: 1  }}>
      <Header title='Order Details' />
      <OrderHeader
        item={orderData.orderItems[0]}
        customerName={orderData.customerName}
        orderDate={orderData.orderDate}
        orderNumber={orderData.orderNumber}
        trackingNumber={orderData.trackingNumber}
        paymentAmount={orderData.paymentAmount}
        paymentMode={orderData.paymentMode}
        orderStatus={orderData.orderStatus}
      />

      <DeliveryAddressCard address={orderData.deliveryAddress} />

      <OrderProgressTracker steps={orderData.orderSteps} />

      <OrderSummary
        items={orderData.orderItems}
        deliveryFee={orderData.deliveryFee}
        promoCode={orderData.promoCode}
        totalAmount={orderData.totalAmount}
      />

      <ActionButtons />
    </ScrollView>
  );
};

export default OrderTrackingScreen;
