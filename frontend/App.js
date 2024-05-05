import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LoginForm } from "./screens/Login";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
