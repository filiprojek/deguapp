import React from "react";
import { Text as RNText } from "react-native";

const Text = (props) => {
	// Apply your default text color and any other styles here
	const defaultStyles = {
		color: "white", // Set the default text color to white
	};

	return <RNText style={[defaultStyles, props.style]}>{props.children}</RNText>;
};

export default Text;
