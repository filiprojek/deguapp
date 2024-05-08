import { View } from "react-native";
import Text from "@components/Text";
import Button from "@components/Button";
import { colors } from "@components/style";
import { router } from "expo-router";

export default function Tab() {
	return (
		<View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
			<Text>Tab BEER</Text>

			<Button
				title="Add Beers"
				color={colors.gold}
				onPress={() => {
					router.replace("/beer/add");
				}}
			/>
		</View>
	);
}
