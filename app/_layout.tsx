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
      <Stack.Screen name="sizeproduct" options={{ title: "Size" }} />
      <Stack.Screen name="rating" options={{ title: "Rating" }} />
      <Stack.Screen name="Notification" options={{ title: "Notification" }} />
      <Stack.Screen name="Alert" options={{ title: "Alert" }} />
      <Stack.Screen name="Saved" options={{ title: "Saved" }} />
      <Stack.Screen name="NoSaved" options={{ title: "Saved Items" }} />
      <Stack.Screen name="emptycart" options={{ title: "My Cart" }} />
      <Stack.Screen name="mycart" options={{ title: "My Cart" }} />










    </Stack>
  );

}
