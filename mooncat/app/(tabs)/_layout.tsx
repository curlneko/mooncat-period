import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ホーム',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,

        }}
      />
      <Tabs.Screen
        name="adding"
        options={{
          title: '生理を記録',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: '設定',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  );
}
