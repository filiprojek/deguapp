import { Text, View } from "react-native";

import { useAuth } from "../context/AuthContext";

export default function Index() {
	const { onLogout, authState } = useAuth();

	const user = authState.user;

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Welcome {user.username}</Text>
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
