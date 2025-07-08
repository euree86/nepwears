import { Stack } from "expo-router";


export default function RootLayout() {
  return (
    <Stack  >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="Login" options={{ title: "Login" }} />
      <Stack.Screen name="loginwithemail" options={{ title: "Emaillogin" }} />
      <Stack.Screen name="signup" options={{ title: "Signup" }} />
      <Stack.Screen name="signupwithemail" options={{ title: "Signupwithemail" }} />
      <Stack.Screen name="home" options={{ title: "Home" }} />
      <Stack.Screen name="notification" options={{ title: "Notification" }} />
      <Stack.Screen name="productdetail" options={{ title: "Product Detail" }} />
      <Stack.Screen name="product" options={{ title: "Product" }} />


    </Stack>
  );

}
