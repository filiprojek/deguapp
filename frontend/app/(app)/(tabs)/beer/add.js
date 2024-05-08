import { StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import Button from "@components/Button";
import { colors } from "@components/style";

export default function BeerAdd() {
	const [b_name, setBName] = useState("");
	const [b_degree, setBDegree] = useState("");
	const [b_packaging, setBPackaging] = useState("");
	const [b_brand, setBBrand] = useState("");

	async function addBeer() {
		// TODO: after the request - redirect to /beer/{new_beer_id}?; plus some modal about successful state
		const req = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/beer/add`, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				brand: b_brand,
				name: b_name,
				degree: b_degree,
				packaging: b_packaging,
				photos: null,
			}),
		});
		const res = await req.json();
	}

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<TextInput
					style={styles.input}
					placeholder="Name"
					value={b_name}
					onChangeText={(text) => setBName(text)}
					placeholderTextColor="#aaaaaa"
				/>
				<TextInput
					style={styles.input}
					placeholder="Brand"
					value={b_brand}
					onChangeText={(text) => setBBrand(text)}
					placeholderTextColor="#aaaaaa"
				/>
				<TextInput
					style={styles.input}
					placeholder="Degree"
					value={b_degree}
					onChangeText={(text) => setBDegree(text)}
					placeholderTextColor="#aaaaaa"
				/>
				<TextInput
					style={styles.input}
					placeholder="Packaging"
					value={b_packaging}
					onChangeText={(text) => setBPackaging(text)}
					placeholderTextColor="#aaaaaa"
				/>
				<Button title="Add beer" color={colors.green} onPress={addBeer} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	form: {
		flex: 1,
		alignItems: "center",
		paddingTop: "10%",
		gap: 15,
	},
	input: {},
	input: {
		height: "auto",
		width: "60%",
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
		color: "#fff",
	},
});
