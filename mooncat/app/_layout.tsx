import { Stack } from 'expo-router/stack';
import { useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native'

import { ApolloProvider } from '@apollo/client';
import client from '@/src/apolloClient';

import { AuthProvider, AuthContext } from '@/context/AuthContext';

export default function Layout() {
  return (
    <AuthProvider>
      <ProtectedStack />
    </AuthProvider>
  )
}

function ProtectedStack() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth?.isAuthenticated === false) {
      router.replace("/signin");
    }
  }, [auth?.isAuthenticated]);

  if (auth?.isAuthenticated === null) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ headerShown: false }} />
      </Stack>
    </ApolloProvider>
  );
}
