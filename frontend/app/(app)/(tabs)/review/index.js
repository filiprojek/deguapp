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

	return (
		<View style={styles.container}>
			<Button
				title="Add Review"
				color={colors.gold}
				onPress={() => {
					router.replace("/review/add");
				}}
			/>

			<FlatList
				data={data}
				style={styles.reviewList}
				keyExtractor={(item) => String(item._id)}
				renderItem={({ item }) => (
					<View style={styles.item}>
						<Text>Name: {item.name}</Text>
						<Text>Brand: {item.brand}</Text>
						<Text>Degree: {item.degree}</Text>
						<Text>Packaging: {item.packaging}</Text>
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
