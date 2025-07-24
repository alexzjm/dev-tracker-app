import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ title: 'Auth' }} />
      <Stack.Screen name="(tabs)" options={{ title: 'Main App' }} />
    </Stack>
  );
}
