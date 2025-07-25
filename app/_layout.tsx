import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar, View, Platform } from 'react-native';
import Constants from 'expo-constants';

export default function RootLayout() {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 10,
          backgroundColor: 'white', // you can change this to dynamic if needed
        }}
      >
        <Stack initialRouteName="index">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="loginwithemail" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="signupwithemail" options={{ headerShown: false }} />
          <Stack.Screen name="notification" options={{ title: 'Notification' }} />
          <Stack.Screen name="productdetail" options={{ headerShown: false }} />
          <Stack.Screen name="verificationcode" options={{ headerShown: false }} />
          <Stack.Screen name="createnewpw" options={{ headerShown: false }} />
          <Stack.Screen name="location" options={{ headerShown: false }} />
          <Stack.Screen name="locationsearch" options={{ title: 'Enter your location' }} />
          <Stack.Screen name="forgotpw" options={{ headerShown: false }} />
          <Stack.Screen name="product" options={{ title: 'Product' }} />
          <Stack.Screen name="sizeproduct" options={{ title: 'Size' }} />
          <Stack.Screen name="rating" options={{ title: 'Rating' }} />
          <Stack.Screen
            name="notificationdetail"
            options={{ title: 'Notification Detail', headerTitleAlign: 'center' }}
          />
          <Stack.Screen name="Alert" options={{ title: 'Alert' }} />
          <Stack.Screen name="NoSaved" options={{ title: 'Saved Items' }} />
          <Stack.Screen name="myorder" options={{ title: 'My Orders', headerTitleAlign: 'center' }} />
          <Stack.Screen name="myprofile" options={{ title: 'My Profile', headerTitleAlign: 'center' }} />
          <Stack.Screen name="paymentmethod" options={{ title: 'Payment Method', headerTitleAlign: 'center' }} />
          <Stack.Screen name="helpcenter" options={{ title: 'Help Center', headerTitleAlign: 'center' }} />
          <Stack.Screen name="newcard" options={{ title: 'New Card', headerTitleAlign: 'center' }} />
          <Stack.Screen name="newaddress" options={{ title: 'New Address', headerTitleAlign: 'center' }} />
          <Stack.Screen name="emptycart" options={{ title: 'My Cart' }} />
          <Stack.Screen name="sizeproductdetail" options={{ title: 'Productdetail' }} />
          <Stack.Screen name="ratingandreview" options={{ title: 'Rating and Review' }} />
        </Stack>
      </View>
    </>
  );
}
