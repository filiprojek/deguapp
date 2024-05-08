import { Link as EXLink } from "expo-router";

const Link = (props) => {
	const defaultStyles = {
		color: "white",
	};

	return (
		<EXLink style={[defaultStyles, props.style]} href={props.href}>
			{props.children}
		</EXLink>
	);
};

export default Link;
