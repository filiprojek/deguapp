import {
	StyleSheet,
	View,
	FlatList,
	Dimensions,
	StatusBar,
	Image,
} from "react-native";
import Text from "@components/Text";
import Button from "@components/Button";
import { colors } from "@components/style";
import { router } from "expo-router";
import { useEffect, useState } from "react";
// import { FlashList } from "@shopify/flash-list";

export default function Tab() {
	const API_HOST = process.env.EXPO_PUBLIC_API_URL.replace("/api/v1", "");
	const [data, setData] = useState([]);
	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		try {
			const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/beer/get`, {
				method: "GET",
				credentials: "include",
			});
			const data = await res.json();
			setData(data.data);
		} catch (err) {
			console.error(err);
			alert("Something went wrong");
		}
	}

	return (
		<View style={styles.container}>
			<Button
				title="Add new beer"
				color={colors.gold}
				onPress={() => {
					router.replace("/beer/add");
				}}
			/>

			{/* 				<FlashList
					data={data}
					estimatedItemSize={100}
					keyExtractor={(item) => String(item._id)}
					renderItem={({ item }) => (
						<View style={styles.item}>
							<Text>Name: {item.name}</Text>
							<Text>Brand: {item.brand}</Text>
							<Text>Degree: {item.degree}</Text>
							<Text>Packaging: {item.packaging}</Text>
						</View>
					)}
				/> */}

			<FlatList
				data={data}
				style={styles.beerList}
				keyExtractor={(item) => String(item._id)}
				renderItem={({ item }) => (
					<View style={styles.item}>
						<Image
							source={
								item.imgs[0]
									? {
											uri: `${API_HOST}/public/uploads/${item.imgs[0]}`,
										}
									: {
											uri: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https:%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2020%2F09%2F29%2Flight-beer.jpg",
										}
							}
							style={styles.itemImg}
						/>
						<View style={styles.itemDesc}>
							<Text>Name: {item.name}</Text>
							<Text>Brand: {item.brand}</Text>
							<Text>Degree: {item.degree}</Text>
							<Text>Packaging: {item.packaging}</Text>
						</View>
						<View style={styles.itemAddReview}>
							<Button
								title="Add review"
								color={colors.gold}
								onPress={() => {
									router.push(`/review/${item._id}`);
								}}
							/>
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
		marginTop: "2%",
	},
	beerList: {
		width: "100%",
		paddingHorizontal: "15%",
		marginTop: "2%",
	},
	item: {
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 10,
		padding: 13,
		marginBottom: "5%",
	},
	itemImg: {
		height: 300,
		resizeMode: "contain",
	},
	itemDesc: {
		alignItems: "center",
		paddingBottom: "2%",
	},
});
