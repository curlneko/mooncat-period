import { View, StyleSheet } from 'react-native';
import { Avatar, Card, IconButton } from "react-native-paper";

import { useRouter } from 'expo-router';

export default function Tab() {
  const router = useRouter();

  return (
    <View>
      <Card onPress={() => router.push("/(tabs)/adding/calendar")}>
        <Card.Title
          title="生理日記録"
          subtitle="カレンダーに生理日を記録する"
          left={(props) => <Avatar.Icon {...props} icon="calendar" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => console.log("Menu clicked")} />}
        />
      </Card>
    </View>
  );
}
