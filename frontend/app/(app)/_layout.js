import { Redirect, Stack, Slot } from "expo-router";
import { useAuth } from "@context/AuthContext";
import { View, Text, StyleSheet } from "react-native";

export default function AppLayout() {
	const { authState } = useAuth();

	if (authState.authenticated === null) {
		// micro loading co neni skoro videt ale get the fuck out se uz neloguje
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (!authState.authenticated) {
		console.log("get the fuck out");
		return <Redirect href="/login" />;
	}

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}
