import { Stack } from "expo-router";


export default function RootLayout() {
  return (
    <Stack  >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="Login" options={{ title: "Login" }} />
      <Stack.Screen name="loginwithemail" options={{ title: "Emaillogin" }} />
      <Stack.Screen name="signup" options={{ title: "Signup" }} />
      <Stack.Screen name="signupwithemail" options={{ title: "Signupwithemail" }} />
    </Stack>
  );

}
