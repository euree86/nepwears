import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar, View, Platform, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import * as Font from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        // ✅ Use clear, consistent names for fonts
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
        }}
      >
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerStyle: { backgroundColor: 'white' },
            contentStyle: { backgroundColor: 'white' },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold', // ✅ Matches the loaded name
              fontSize: 18,
            },
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
          <Stack.Screen name="notificationdetail" options={{ headerShown: false }} />
          <Stack.Screen name="myorder" options={{ headerShown: false }} />
          <Stack.Screen name="myprofile" options={{ headerShown: false }} />
          <Stack.Screen name="paymentmethod" options={{ headerShown: false }} />
          <Stack.Screen name="helpcenter" options={{ headerShown: false }} />
          <Stack.Screen name="newcard/main" options={{ headerShown: false }} />
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
          <Stack.Screen name="invitefriends" options={{ headerShown: false }} />
          <Stack.Screen name="viewall/main" options={{ headerShown: false }} />

        </Stack>
      </View>
    </>
  );
}
