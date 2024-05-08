import { StyleSheet, Text, View } from "react-native";
import Button from "@components/Button";
import { colors } from "@components/style";
import { useAuth } from "@context/AuthContext";
import Link from "@components/Link";

export default function Index() {
	const { onLogout, authState } = useAuth();
	const user = authState.user;

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Welcome {user.username}</Text>
			<Link href="/beer">Go to BEER</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	h1: {
		color: "#FFF",
		fontSize: 30,
		textAlign: "center",
		paddingTop: "20%",
	},
});
