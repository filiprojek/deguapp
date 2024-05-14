import { StyleSheet, TextInput, View, Image } from "react-native";
import { useCallback, useState } from "react";
import Button from "@components/Button";
import Text from "@components/Text";
import { colors } from "@components/style";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
const DropdownTheme = require("@components/DropdownTheme");
import { Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function reviewAdd() {
	// States for each dropdown
	const routeParams = useLocalSearchParams();
	const [openFoam, setOpenFoam] = useState(false);
	const [openBitterSweetness, setOpenBitterSweetness] = useState(false);
	const [openTaste, setOpenTaste] = useState(false);
	const [openPackaging, setOpenPackaging] = useState(false);
	const [openSourness, setOpenSourness] = useState(false);
	const [openAgain, setOpenAgain] = useState(false);

	// pěna
	const [itemFoam, setFoamValue] = useState(null);
	const [foam, setFoam] = useState([
		{
			label: "Bad",
			value: "1",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-x-eyes.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "Medium",
			value: "2",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-meh.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "Excelent",
			value: "3",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley.png")}
					style={styles.iconStyle}
				/>
			),
		},
	]);

	// hořkost / sladkost
	const [itemBitter_sweetness, setBitter_sweetnessValue] = useState(null);
	const [bitter_sweetness, setBitter_sweetness] = useState([
		{
			label: "Bad",
			value: "1",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-x-eyes.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "Medium",
			value: "2",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-meh.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "Excelent",
			value: "3",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley.png")}
					style={styles.iconStyle}
				/>
			),
		},
	]);

	//chuť
	const [itemTaste, setTasteValue] = useState(null);
	const [taste, setTaste] = useState([
		{
			label: "Disgust",
			value: "1",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-blank.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "Not great, not terrible",
			value: "2",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-nervous.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "Good",
			value: "3",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-meh.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "Why not",
			value: "4",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-wink.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "Excelent!",
			value: "5",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley.png")}
					style={styles.iconStyle}
				/>
			),
		},
	]);

	// packaging
	const [itemPackaging, setPackagingValue] = useState(null);
	const [packaging, setPackaging] = useState([
		{
			label: "Disgust",
			value: "1",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-blank.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "Not great, not terrible",
			value: "2",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-nervous.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "Good",
			value: "3",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-meh.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "Why not",
			value: "4",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-wink.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "Excelent!",
			value: "5",
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley.png")}
					style={styles.iconStyle}
				/>
			),
		},
	]);

	//kyselost
	const [itemSourness, setSournessValue] = useState(null);
	const [sourness, setSourness] = useState([
		{
			label: "True",
			value: true,
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-blank.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "False",
			value: false,
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-nervous.png")}
					style={styles.iconStyle}
				/>
			),
		},
	]);

	//dal bych si znovu?
	const [itemAgain, setAgainValue] = useState(null);
	const [again, setAgain] = useState([
		{
			label: "Yes",
			value: true,
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley.png")}
					style={styles.iconStyle}
				/>
			),
		},
		{
			label: "No",
			value: false,
			icon: () => (
				<Image
					source={require("@assets/smileys/smiley-x-eyes.png")}
					style={styles.iconStyle}
				/>
			),
		},
	]);

	//podmínky pro zavření ostatních dropdownů, pokud je jiný otevřený
	const onOpenFoam = useCallback(() => {
		setOpenBitterSweetness(false);
		setOpenTaste(false);
		setOpenPackaging(false);
		setOpenSourness(false);
		setOpenAgain(false);
		setOpenFoam(true);
	}, []);

	const onOpenBitterSweetness = useCallback(() => {
		setOpenFoam(false);
		setOpenTaste(false);
		setOpenPackaging(false);
		setOpenSourness(false);
		setOpenAgain(false);
		setOpenBitterSweetness(true);
	}, []);

	const onOpenTaste = useCallback(() => {
		setOpenFoam(false);
		setOpenBitterSweetness(false);
		setOpenPackaging(false);
		setOpenSourness(false);
		setOpenAgain(false);
		setOpenTaste(true);
	}, []);

	const onOpenPackaging = useCallback(() => {
		setOpenFoam(false);
		setOpenBitterSweetness(false);
		setOpenTaste(false);
		setOpenSourness(false);
		setOpenAgain(false);
		setOpenPackaging(true);
	}, []);

	const onOpenSourness = useCallback(() => {
		setOpenFoam(false);
		setOpenBitterSweetness(false);
		setOpenTaste(false);
		setOpenPackaging(false);
		setOpenAgain(false);
		setOpenSourness(true);
	}, []);

	const onOpenAgain = useCallback(() => {
		setOpenFoam(false);
		setOpenBitterSweetness(false);
		setOpenTaste(false);
		setOpenPackaging(false);
		setOpenSourness(false);
		setOpenAgain(true);
	}, []);

	DropDownPicker.addTheme("DropdownTheme", DropdownTheme);
	DropDownPicker.setTheme("DropdownTheme");

	async function addBeer() {
		const req = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/review/add`, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				beer_id: routeParams.beer_id,
				foam: itemFoam,
				bitter_sweetness: itemBitter_sweetness,
				taste: itemTaste,
				packaging: itemPackaging,
				sourness: itemSourness,
				would_again: itemAgain,
			}),
		});
		const res = await req.json();

		if (res.code == 201 && res.data._id) {
			// window.location.href = `/review/${res.data._id}`;
			// TODO: use react router for redirect
			alert("Review was added!");
		} else {
			alert(
				"Review was not added successfully. Please check your data and try again.",
			);
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<Text style={styles.text}>
					How does your beer taste? Write a review!
				</Text>
				<Text style={styles.dropdownText} zIndex={6000} zIndexInverse={1000}>
					How does the foam look like?
				</Text>
				<DropDownPicker
					open={openFoam}
					onOpen={onOpenFoam}
					value={itemFoam}
					items={foam}
					setOpen={setOpenFoam}
					setValue={setFoamValue}
					setItems={setFoam}
					placeholder="Please select..."
					theme="DropdownTheme"
					zIndex={6000}
					zIndexInverse={1000}
				/>
				<Text style={styles.dropdownText} zIndex={5000} zIndexInverse={2000}>
					More bitter, or more sweet?
				</Text>
				<DropDownPicker
					open={openBitterSweetness}
					onOpen={onOpenBitterSweetness}
					value={itemBitter_sweetness}
					items={bitter_sweetness}
					setOpen={setOpenBitterSweetness}
					setValue={setBitter_sweetnessValue}
					setItems={setBitter_sweetness}
					placeholder="Please select..."
					theme="DropdownTheme"
					zIndex={5000}
					zIndexInverse={2000}
				/>

				<Text style={styles.dropdownText} zIndex={4000} zIndexInverse={3000}>
					How does it taste?
				</Text>
				<DropDownPicker
					open={openTaste}
					onOpen={onOpenTaste}
					value={itemTaste}
					items={taste}
					setOpen={setOpenTaste}
					setValue={setTasteValue}
					setItems={setTaste}
					placeholder="Please select..."
					theme="DropdownTheme"
					zIndex={4000}
					zIndexInverse={3000}
				/>

				<Text style={styles.dropdownText} zIndex={5000} zIndexInverse={4000}>
					How do you like the packaging?
				</Text>
				<DropDownPicker
					open={openPackaging}
					onOpen={onOpenPackaging}
					value={itemPackaging}
					items={packaging}
					setOpen={setOpenPackaging}
					setValue={setPackagingValue}
					setItems={setPackaging}
					placeholder="Please select..."
					theme="DropdownTheme"
					zIndex={3000}
					zIndexInverse={4000}
				/>

				<Text style={styles.dropdownText} zIndex={4000} zIndexInverse={5000}>
					Is it sour?
				</Text>
				<DropDownPicker
					open={openSourness}
					onOpen={onOpenSourness}
					value={itemSourness}
					items={sourness}
					setOpen={setOpenSourness}
					setValue={setSournessValue}
					setItems={setSourness}
					placeholder="Please select..."
					theme="DropdownTheme"
					zIndex={2000}
					zIndexInverse={5000}
				/>

				<Text style={styles.dropdownText} zIndex={5000} zIndexInverse={6000}>
					Would you drink it again?
				</Text>
				<DropDownPicker
					open={openAgain}
					onOpen={onOpenAgain}
					value={itemAgain}
					items={again}
					setOpen={setOpenAgain}
					setValue={setAgainValue}
					setItems={setAgain}
					placeholder="Please select..."
					theme="DropdownTheme"
					zIndex={1000}
					zIndexInverse={6000}
				/>

				<View style={styles.buttonSend}>
					<Button title="Add review" color={colors.gold} onPress={addBeer} />
				</View>
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
		gap: 5,
		width: "80%",
	},
	buttonSend: {
		display: "flex",
		alignItems: "center",
		marginTop: "2%",
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
	iconStyle: {
		width: 30,
		height: 30,
	},
	dropdownContainer: {
		width: "100%",
	},
	dropdownText: {
		color: colors.white,
		fontSize: 16,
		paddingBottom: 1,
		paddingTop: "1%",
		display: "flex",
		alignItems: "flex-start",
		flexDirection: "column",
	},
});
