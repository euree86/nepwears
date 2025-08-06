import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar, View, Platform } from 'react-native';
import Constants from 'expo-constants';

export default function RootLayout() {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Padding to avoid content under status bar */}
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
        }}
      >
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'white',
            },
            contentStyle: {
              backgroundColor: 'white',
            },
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login/login" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login/loginwithemail" options={{ headerShown: false }} />
          <Stack.Screen name="signup/signup" options={{ headerShown: false }} />
          <Stack.Screen name="signup/signupwithemail" options={{ headerShown: false }} />
          <Stack.Screen name="notification" options={{ headerShown: false }} />
          <Stack.Screen name="verificationcode" options={{ headerShown: false }} />
          <Stack.Screen name="createnewpw" options={{ headerShown: false }} />
          <Stack.Screen name="location" options={{ headerShown: false }} />
          <Stack.Screen name="locationsearch" options={{ title: 'Enter your location' }} />
          <Stack.Screen name="forgotpw" options={{ headerShown: false }} />
          <Stack.Screen name="product" options={{ title: 'Product' }} />
          <Stack.Screen name="notificationdetail" options={{ title: 'Notification Detail', headerTitleAlign: 'center' }} />
          <Stack.Screen name="myorder" options={{ headerShown: false }} />
          <Stack.Screen name="myprofile" options={{ title: 'My Profile', headerTitleAlign: 'center' }} />
          <Stack.Screen name="paymentmethod" options={{ title: 'Payment Method', headerTitleAlign: 'center' }} />
          <Stack.Screen name="helpcenter" options={{ title: 'Help Center', headerTitleAlign: 'center' }} />
          <Stack.Screen name="newcard" options={{ title: 'New Card', headerTitleAlign: 'center' }} />
          <Stack.Screen name="newaddress" options={{ title: 'New Address', headerTitleAlign: 'center' }} />
          <Stack.Screen name="emptycart" options={{ title: 'My Cart' }} />
          <Stack.Screen name="sizeproductdetail" options={{ title: 'Productdetail' }} />
          <Stack.Screen name="ratingandreview" options={{ title: 'Rating and Review' }} />
          <Stack.Screen name="checkout/main" options={{ headerShown: false }} />
          <Stack.Screen name="address" options={{ headerShown: false }} />
          <Stack.Screen name="product/main" options={{ headerShown: false }} />
          <Stack.Screen name="categorydetail/main" options={{ headerShown: false }} />
          <Stack.Screen name="membership/main" options={{ headerShown: false }} />
          <Stack.Screen name="ordertrack/main" options={{ headerShown: false }} />













        </Stack>
      </View>
    </>
  );
}
