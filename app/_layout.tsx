import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar, SafeAreaView, View, Platform } from 'react-native';
import Constants from 'expo-constants';

export default function RootLayout() {
  return (
    <>
      {/* Set status bar style and background */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />




      {/* Main navigator stack */}
      <View style={{ flex: 1 }}>
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
          <Stack.Screen name="Notification" options={{ title: 'Notification' }} />
          <Stack.Screen name="Alert" options={{ title: 'Alert' }} />
          <Stack.Screen name="NoSaved" options={{ title: 'Saved Items' }} />

          <Stack.Screen name="emptycart" options={{ title: 'My Cart' }} />
          <Stack.Screen name="sizeproductdetail" options={{ title: 'Productdetail' }} />
          <Stack.Screen name="ratingandreview" options={{ title: 'Rating and Review' }} />
        </Stack>
      </View>
    </>
  );
}
