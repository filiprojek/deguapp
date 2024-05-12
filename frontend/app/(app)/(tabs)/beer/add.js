import { StyleSheet, TextInput, View, Image } from "react-native";
import { useState } from "react";
import Button from "@components/Button";
import { colors } from "@components/style";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

export default function BeerAdd() {
	const [b_name, setBName] = useState("");
	const [b_degree, setBDegree] = useState("");
	const [b_packaging, setBPackaging] = useState("");
	const [b_brand, setBBrand] = useState("");
	const [image, setImage] = useState(null);
	const [selectPackaging, setSelectedPackaging] = useState();

	ImagePicker.getCameraPermissionsAsync(); //check if the user has granted permission to access the camera
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

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

		if (res.code == 201 && res.data._id) {
			window.location.href = `/beer/${res.data._id}`;
		} else {
			alert(
				"Beer was not added successfully. Please check your data and try again.",
			);
		}
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
				<Picker
					selectedValue={selectPackaging}
					onValueChange={(itemValue, itemIndex) =>
						setSelectedPackaging(itemValue)
					}
				>
					<Picker.Item label="Can" value="can" />
					<Picker.Item label="Glass" value="glass" />
					<Picker.Item label="Pint" value="pint" />
					<Picker.Item label="Oddel Barrel" value="oddelBarel" />
					<Picker.Item label="Tank" value="tank" />
					<Picker.Item label="PET bottle" value="petBottle" />
				</Picker>
				<View style={styles.imageContainer}>
					<Button
						style={styles.imageButton}
						title="Pick an image from gallery"
						onPress={pickImage}
					/>
					{image && <Image source={{ uri: image }} style={styles.image} />}
				</View>
				<Button title="Add beer" color={colors.green} onPress={addBeer} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	form: {
		alignItems: "center",
		paddingTop: "10%",
		gap: 15,
	},
	input: {
		height: "auto",
		width: "100%",
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 10,
		padding: 13,
		color: "#fff",
	},
	imageButton: {
		width: "100%",
		backgroundColor: "#FFD700",
	},
	imageContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 150,
		height: 150,
	},
});
