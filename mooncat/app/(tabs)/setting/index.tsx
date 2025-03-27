import { View, Text,StyleSheet } from 'react-native';
import { Avatar, Card, IconButton } from "react-native-paper";

import { useRouter } from 'expo-router';

export default function Tab() {
  const router = useRouter();
  
  return (
    <View>
      <Card onPress={() => router.push("/(tabs)/setting/profile")}>
        <Card.Title
          title="プロフィール"
          subtitle="ユーザのプロフィール"
          left={(props) => <Avatar.Icon {...props} icon="cat" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => console.log("Menu clicked")} />}
        />
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
