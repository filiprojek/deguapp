import { StyleSheet, TextInput, View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import Button from "../components/Button";
import { colors } from "../components/style";

import { useAuth } from "./context/AuthContext";

function LoginPage() {
	const [pass, setPass] = useState("");
	const [email, setEmail] = useState("");
	const { onLogin, authState } = useAuth();

	useEffect(() => {
		if (authState.authenticated) {
			router.replace("/");
		}
	}, [authState.authenticated]);

	function login() {
		onLogin(email, pass);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					source={require("../assets/deguapp_logo.png")}
					style={styles.logo}
				/>
				<Text style={styles.h1}>Please Log In</Text>
			</View>
			<View style={styles.form}>
				<TextInput
					style={styles.input}
					placeholder="Enter your email"
					autoCapitalize="none"
					autoCompleteType="email"
					textContentType="emailAddress"
					keyboardType="email-address"
					placeholderTextColor={"#aaaaaa"}
					returnKeyType="next"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					style={styles.input}
					secureTextEntry={true}
					placeholder="Enter your password"
					placeholderTextColor={"#aaaaaa"}
					returnKeyType="done"
					value={pass}
					onChangeText={(text) => setPass(text)}
				/>
				<View style={styles.btnContainer}>
					<Button
						style={styles.button}
						title="Sign Up"
						color={colors.charcoal}
						onPress={() => router.replace("/signup")}
					/>
					<Button
						style={styles.button}
						title="Log In"
						color={colors.gold}
						onPress={login}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		backgroundColor: colors.dark,
	},
	form: {
		flex: 1,
		alignItems: "center",
		paddingTop: "10%",
		width: "100%",
		gap: 15,
	},
	h1: {
		color: "#FFF",
		fontSize: 30,
		textAlign: "center",
		paddingTop: "20%",
	},
	logo: {
		width: "80%",
		resizeMode: "contain",
	},
	header: {
		width: "100%",
		alignItems: "center",
		paddingTop: "20%",
	},
	input: {
		height: "auto",
		width: "60%",
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
		color: "#fff",
	},
	btnContainer: {
		flexDirection: "row",
		gap: 5,
	},
});

export default LoginPage;
