import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Card, IconButton } from "react-native-paper";

export default function Tab() {
  return (
    <View>
      <Card>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
