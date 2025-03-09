import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "生理を記録" }} />
      <Stack.Screen name="calendar" options={{ title: "カレンダー" }} />
    </Stack>
  );
}
