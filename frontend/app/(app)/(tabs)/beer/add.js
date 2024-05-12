import { StyleSheet, TextInput, View, Image } from "react-native";
import { useState } from "react";
import Button from "@components/Button";
import Text from "@components/Text";
import { colors } from "@components/style";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
/* import DropdownTheme from "@components/DropdownTheme"; */
const DropdownTheme = require("@components/DropdownTheme");

export default function BeerAdd() {
	const [b_name, setBName] = useState("");
	const [b_degree, setBDegree] = useState("");
	const [b_packaging, setBPackaging] = useState("");
	const [b_brand, setBBrand] = useState("");
	const [image, setImage] = useState(null);
	const [selectPackaging, setSelectedPackaging] = useState();

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Tank beer", value: "tank" },
		{ label: "Cask beer", value: "cask" },
		{ label: "Glass bottle", value: "glass" },
		{ label: "Can", value: "can" },
		{ label: "PET bottle", value: "pet" },
	]);

	DropDownPicker.addTheme("DropdownTheme", DropdownTheme);
	DropDownPicker.setTheme("DropdownTheme");

	ImagePicker.getCameraPermissionsAsync(); //check if the user has granted permission to access the camera
	const pickImage = async () => {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("You've refused to allow this appp to access your photos!");
			return;
		}

		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [3, 4],
			// quality: 1,
		});

		// Explore the result
		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const openCamera = async () => {
		// Ask the user for the permission to access the camera
		const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("You've refused to allow this app to access your camera!");
			return;
		}

		const result = await ImagePicker.launchCameraAsync();

		// Explore the result
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
				<Text style={styles.text}>
					Spill your thoughts about the beer you just sipped!
				</Text>
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
				<DropDownPicker
					open={open}
					value={value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
					placeholder={"What are you drinking from?"}
					theme="DropdownTheme"
				/>
				<View style={styles.imageContainer}>
					<Button
						title="Open gallery"
						onPress={pickImage}
						buttonStyle={styles.imageButton}
						textStyle={styles.imageTextButton}
					/>

					<Button
						onPress={openCamera}
						title="Open camera"
						buttonStyle={styles.imageButton}
						textStyle={styles.imageTextButton}
					/>
				</View>
				{image && <Image source={{ uri: image }} style={styles.image} />}
				<Button title="Add beer" color={colors.gold} onPress={addBeer} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		display: "flex",
	},
	form: {
		alignItems: "center",
		gap: 15,
		width: "80%",
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
	imageContainer: {
		alignItems: "center",
		justifyContent: "center",
		display: "flex",
		flexDirection: "row",
		gap: 10,
	},
	imageButton: {
		backgroundColor: colors.dark,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 10,
	},
	imageTextButton: {
		color: colors.white,
	},
	image: {
		width: 150,
		height: 150,
	},
	text: {
		color: colors.white,
		fontSize: 24,
		textAlign: "center",
		paddingBottom: "3%",
		paddingTop: "10%",
	},
});
