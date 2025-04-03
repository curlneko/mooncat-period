import { View } from 'react-native';
import { Avatar, Card, IconButton } from "react-native-paper";
import { useContext } from 'react';
import { useRouter } from 'expo-router';

import { AuthContext } from '@/context/AuthContext';

export default function Tab() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const handleLogOut = async () => {
    await auth.logout();
    router.replace("/signin");
  }

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
      <Card onPress={handleLogOut}>
        <Card.Title
          title="ログアウト"
          left={(props) => <Avatar.Icon {...props} icon="logout" />}
        />
      </Card>
    </View>
  );
}
