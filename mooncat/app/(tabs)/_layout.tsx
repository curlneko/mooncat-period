import { useContext } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import { AuthContext } from '@/context/AuthContext';

export default function TabLayout() {
  const auth = useContext(AuthContext);
  console.log(auth?.groups.includes("Admin"));

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
      {/* 管理者のみ表示 */}
      <Tabs.Screen
        name="admin"
        options={{
          title: '管理者',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
          headerShown: false,
          href: auth?.groups.includes("Admin") ? undefined : null
        }}
      />
    </Tabs>
  );
}
