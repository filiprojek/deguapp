import { View } from "react-native";
import Button from "@components/Button";
import { colors } from "@components/style";
import { useAuth } from "@context/AuthContext";
import Text from "@components/Text";

export default function Tab() {
	const { onLogout, authState } = useAuth();
	const user = authState.user;

	return (
		<View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
			<Text>Welcome {user.username}</Text>
			<Button title="Log out" color={colors.brown} onPress={onLogout} />
		</View>
	);
}
