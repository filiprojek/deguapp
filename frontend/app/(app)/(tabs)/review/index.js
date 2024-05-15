import { View, StyleSheet, FlatList, Image } from "react-native";
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

	const API_HOST = process.env.EXPO_PUBLIC_API_URL.replace("/api/v1", "");

	async function fetchData() {
		try {
			const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/review/get`, {
				method: "GET",
				credentials: "include",
			});
			let data = await res.json();
			// show only logged in user's data
			data = data.data.filter((review) => review.user_id == user._id);

			let beers = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/beer/get`, {
				method: "GET",
				credentials: "include",
			});
			beers = await beers.json();
			beers = beers.data;
			console.log(beers);

			async function getBeerParam(search, beers) {
				for (let i = 0; i < beers.length; i++) {
					if (beers[i]._id == search) {
						return beers[i];
					}
				}
				return null;
			}

			data.forEach(async (el) => {
				el.beer = await getBeerParam(el.beer_id, beers);
			});

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
					<View style={styles.itemContainer}>
						<View>
							<Text>{item.beer.name}</Text>
							<Text>{item.beer.brand}</Text>
							<Text>{item.beer.degree}°</Text>
							<Text>{item.beer.packaging}</Text>
							<Image
								source={
									item.beer.imgs[0]
										? {
												uri: `${API_HOST}/public/uploads/${item.beer.imgs[0]}`,
											}
										: {
												uri: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https:%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2020%2F09%2F29%2Flight-beer.jpg",
											}
								}
								style={styles.itemImg}
							/>
						</View>
						<View>
							<Text>Foam → {opt3[item.foam - 1]}</Text>
							<Text>
								Bitter / Sweetness → {opt3[item.bitter_sweetness - 1]}
							</Text>
							<Text>Taste → {opt5[item.taste - 1]}</Text>
							<Text>Packaging → {opt5[item.packaging - 1]}</Text>
							<Text>Sourness → {sourness[item.sourness - 1]}</Text>
							<Text>Would again? → {opt2[item.would_again - 1]}</Text>
						</View>
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
	itemContainer: {
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 10,
		padding: 13,
		marginBottom: "5%",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	itemImg: {
		width: 150,
		aspectRatio: 1,
		resizeMode: "contain",
		marginTop: "5%",
	},
});
