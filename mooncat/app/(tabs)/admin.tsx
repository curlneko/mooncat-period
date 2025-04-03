import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";

import { AuthContext } from '@/context/AuthContext';

export default function Tab() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  if(auth?.groups.includes("Admin")){
    return (
      <View style={styles.container}>
        <Text>Tab Admin</Text>
      </View>
    );
  }else{
    router.push("/(tabs)");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
