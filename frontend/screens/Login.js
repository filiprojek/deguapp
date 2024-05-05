import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from "react-native";
import Button from "../components/Button";
import { colors } from "../components/style";

export function LoginForm() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        placeholderTextColor={"#aaaaaa"}
        returnKeyType="next"
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Enter your password"
        placeholderTextColor={"#aaaaaa"}
        returnKeyType="done"
      />
      <View style={styles.btnContainer}>
        <Button style={styles.button} title="Sign Up" color={colors.charcoal} />
        <Button style={styles.button} title="Log In" color={colors.green} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flex: 1,
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    color: "#FFF",
    fontSize: 22,
  },
  input: {
    height: "auto",
    width: "60%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  button: {},
  btnContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
