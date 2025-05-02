import { Stack } from 'expo-router';

export default function ComponentsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="cameras" />
      <Stack.Screen name="services" />
    </Stack>
  );
} 