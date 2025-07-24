import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  // Temporary auth state - later you'll replace this with real auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}
