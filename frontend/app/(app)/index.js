import { Text, View } from "react-native";

import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { onLogout } = useAuth();
  const user = "debil"
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome {user}</Text>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          onLogout();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
