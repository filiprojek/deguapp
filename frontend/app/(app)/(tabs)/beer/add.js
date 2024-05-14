import { StyleSheet, TextInput, View, Image } from "react-native";
import { useState } from "react";
import Button from "@components/Button";
import Text from "@components/Text";
import { colors } from "@components/style";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
const DropdownTheme = require("@components/DropdownTheme");
import { Platform } from "react-native";

export default function BeerAdd() {
	const [b_name, setBName] = useState("");
	const [b_degree, setBDegree] = useState("");
	const [b_packaging, setBPackaging] = useState(null);
	const [b_brand, setBBrand] = useState("");
	const [image, setImage] = useState(null);

	const [open, setOpen] = useState(false);
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
			setImage(result.assets[0]);
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
			setImage(result.assets[0]);
		}
	};

	function validateDegreeInput(text) {
		let newText = "";
		let numbers = "0123456789.";

		for (var i = 0; i < text.length; i++) {
			if (numbers.indexOf(text[i]) > -1) {
				newText = newText + text[i];
				setBDegree(newText);
			} else {
				// your call back function
				alert("Please enter numbers only.");
				setBDegree("");
			}
		}
	}
	function dataURItoBlob(dataURI) {
		// convert base64/URLEncoded data component to raw binary data held in a string
		var byteString;
		if (dataURI.split(",")[0].indexOf("base64") >= 0)
			byteString = atob(dataURI.split(",")[1]);
		else byteString = unescape(dataURI.split(",")[1]);

		// separate out the mime component
		var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

		// write the bytes of the string to a typed array
		var ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ia], { type: mimeString });
	}

	async function addBeer() {
		// TODO: after the request - redirect to /beer/{new_beer_id}?; plus some modal about successful state
		const data = new FormData();
		data.append("photos", dataURItoBlob(image.uri));
		data.append("brand", b_brand);
		data.append("name", b_name);
		data.append("degree", b_degree);
		data.append("packaging", "can");

		try {
			const req = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/beer/add`, {
				method: "POST",
				credentials: "include",
				body: data,
			});
			const res = await req.json();

			if (res.code == 201 && res.data._id) {
				window.location.href = `/beer/${res.data._id}`;
			} else {
				alert(
					"Beer was not added successfully. Please check your data and try again.",
				);
			}
		} catch (err) {
			alert(
				"Beer was not added successfully. Please check your data and try again.",
			);
			console.error(err);
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
					onChangeText={(text) => validateDegreeInput(text)}
					placeholderTextColor="#aaaaaa"
					keyboardType="numeric"
					maxLength={3}
				/>

				<DropDownPicker
					open={open}
					value={b_packaging}
					items={items}
					setOpen={setOpen}
					setValue={setBPackaging}
					setItems={setItems}
					placeholder={"What are you drinking from?"}
					theme="DropdownTheme"
					//searchable={true} //maybe we can use it later...
				/>

				<View style={styles.imageContainer}>
					<Button
						title="Open gallery"
						onPress={pickImage}
						buttonStyle={styles.imageButton}
						textStyle={styles.imageTextButton}
					/>

					{Platform.OS != "web" ? (
						<Button
							title="Open camera"
							onPress={openCamera}
							buttonStyle={styles.imageButton}
							textStyle={styles.imageTextButton}
						/>
					) : (
						false
					)}

					{image && <Image source={{ uri: image }} style={styles.image} />}
				</View>
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
