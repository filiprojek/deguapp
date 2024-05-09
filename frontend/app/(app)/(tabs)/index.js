import { StyleSheet, Text, View } from "react-native";
import Button from "@components/Button";
import { colors } from "@components/style";
import { useAuth } from "@context/AuthContext";
import { router } from "expo-router";

export default function Index() {
	const { onLogout, authState } = useAuth();
	const user = authState.user;

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Welcome {user.username}!</Text>
			<Text style={styles.h2}>We hope, you're enjoying your beer.</Text>
			<View style={styles.button}>
				<Button
					style={styles.button}
					title="Add beer!"
					color={colors.gold}
					textColor={colors.white}
					onPress={() => {
						router.push("/beer");
					}}
				></Button>
			</View>
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
	h2: {
		color: "#FFF",
		fontSize: 20,
		textAlign: "center",
		paddingTop: "1%",
	},
	button: {
		color: colors.charcoal,
		fontSize: 30,
		textAlign: "center",
		paddingTop: "2%",
	},
});
