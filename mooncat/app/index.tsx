import { View, Image, Text, StyleSheet } from "react-native";
import { Stack, usePathname, Link } from "expo-router";
import { useEffect } from "react";

function LogoTitle() {
  return (
    <Image style={styles.image} source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} />
  )
}

export default function HomeScreen() {
  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({ headerShown: false });
  // }, [])

  return (
    <View style={styles.container}>
      <Stack.Screen name="index"
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#66D2CE"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          },
          headerTitle: () => <LogoTitle />
        }}
      />
      <Text>This is My Home</Text>
      <Link href={{ pathname: "details", params: { name: "Bacon" } }}>Go to Details</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50
  }
});
