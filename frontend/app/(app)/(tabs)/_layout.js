import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { colors } from "@components/style";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
	return (
		<View style={{ flex: 1 }}>
			<StatusBar style="light" />
			<Tabs
				screenOptions={{
					headerStyle: {
						backgroundColor: colors.dark,
					},
					headerTintColor: "white",
					tabBarStyle: {
						backgroundColor: colors.darkSecondary,
					},
					tabBarActiveTintColor: colors.gold,
					headerShown: true,
				}}
				sceneContainerStyle={{ backgroundColor: colors.dark }}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={28} name="home" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="beer/index"
					options={{
						title: "Beers",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={28} name="beer" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="review/index"
					options={{
						title: "Reviews",
						tabBarIcon: ({ color }) => (
							<MaterialIcons size={28} name="reviews" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						title: "Settings",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={28} name="cog" color={color} />
						),
					}}
				/>

				{/* Hide following routes from bottom bar */}
				<Tabs.Screen
					name="beer/add"
					options={{ href: null, title: "Add beer" }}
				/>
				<Tabs.Screen
					name="review/add"
					options={{ href: null, title: "Add review" }}
				/>
			</Tabs>
		</View>
	);
}
