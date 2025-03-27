import { Stack } from 'expo-router/stack';

import { ApolloProvider } from '@apollo/client';
import client from '@/src/apolloClient';

export default function Layout() {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ headerShown: false }} />
      </Stack>
    </ApolloProvider>
  );
}
