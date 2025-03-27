import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "設定" }} />
      <Stack.Screen name="profile" options={{ title: "プロフィール" }} />
    </Stack>
  );
}
