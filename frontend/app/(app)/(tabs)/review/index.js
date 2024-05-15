import { View, StyleSheet, FlatList } from "react-native";
import Text from "@components/Text";
import Button from "@components/Button";
import { colors } from "@components/style";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "@context/AuthContext";

export default function Tab() {
	const { authState } = useAuth();
	const user = authState.user;
	const [data, setData] = useState([]);
	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		try {
			const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/review/get`, {
				method: "GET",
				credentials: "include",
			});
			let data = await res.json();
			// show only logged in user's data
			data = data.data.filter((review) => review.user_id == user._id);
			console.log("reviews", data);
			setData(data);
		} catch (err) {
			console.error(err);
			alert("Something went wrong");
		}
	}
	const opt3 = ["Bad", "Medium", "Excellent!"];
	const opt5 = [
		"Disgust",
		"Not great, not terrible",
		"Good",
		"Why not?",
		"Excellent!",
	];
	const opt2 = ["Yes", "No"];
	const sourness = ["Good", "Bad"];

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				style={styles.reviewList}
				keyExtractor={(item) => String(item._id)}
				renderItem={({ item }) => (
					<View style={styles.item}>
						<Text>Foam → {opt3[item.foam - 1]}</Text>
						<Text>Bitter / Sweetness → {opt3[item.bitter_sweetness - 1]}</Text>
						<Text>Taste → {opt5[item.taste - 1]}</Text>
						<Text>Packaging → {opt5[item.packaging - 1]}</Text>
						<Text>Sourness → {sourness[item.sourness - 1]}</Text>
						<Text>Would again? → {opt2[item.would_again - 1]}</Text>
					</View>
				)}
			/>
		</View>
	);
}

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: "5%",
	},
	reviewList: {
		width: "100%",
		paddingHorizontal: "15%",
		marginTop: "5%",
	},
	item: {
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 10,
		padding: 13,
		marginBottom: "5%",
	},
});
