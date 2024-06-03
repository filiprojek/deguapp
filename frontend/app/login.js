import { StyleSheet, TextInput, View, Image } from "react-native";
import Text from "@components/Text";
import Link from "@components/Link";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
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

	async function login() {
		const res = await onLogin(email, pass);
		if (res !== undefined && res.error === true) {
			alert(res.msg);
			return;
		}
	}

	return (
		<View style={styles.container}>
			<AnimatedLinearGradient
				colors={[colors.dark, colors.darkSecondary]}
				style={styles.gradient}
			/>

			<View style={styles.header}>
				<Image
					source={require("../assets/deguapp_logo.png")}
					style={styles.logo}
				/>
			</View>
			<Text style={styles.h1}>Please Log In</Text>
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
						title="Log In"
						color={colors.gold}
						onPress={login}
					/>
				</View>
				<View>
					<Link href="/signup" style={styles.signup}>
						Don't have an account?
					</Link>
				</View>
			</View>
		</View>
	);
}
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	form: {
		flex: 1,
		alignItems: "center",
		width: "100%",
		gap: 15,
	},
	h1: {
		color: "#FFF",
		fontSize: 30,
		textAlign: "center",
		paddingTop: "3%",
		paddingBottom: "3%",
	},
	logo: {
		width: "80%",
		resizeMode: "contain",
		paddingBottom: "0%",
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
		borderRadius: 10,
		padding: 13,
		color: "#fff",
	},
	btnContainer: {
		flexDirection: "row",
		gap: 5,
	},
	button: {
		width: "40%",
	},
	gradient: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: "100%",
	},
	signup: {
		textDecorationLine: "underline",
		fontSize: 14,
		marginTop: 10,
		fontStyle: "italic",
	},
});

export default LoginPage;
