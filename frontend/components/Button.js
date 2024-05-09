import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function Button(props) {
	const {
		onPress,
		title = "Button",
		color = "black",
		textColor = "white",
	} = props;
	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: pressed
						? "rgb(210, 230, 255 )"
						: color
							? color
							: "black",
				},
				styles.button,
			]}
			onPress={onPress}
		>
			<Text style={[styles.text, { color: textColor }]}>{title}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		//color: textColor,
	},
});
