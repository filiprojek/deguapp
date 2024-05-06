import { StyleSheet, TextInput, View, Text, Image } from "react-native";
import { useState } from "react";
import Button from "../components/Button";
import { colors } from "../components/style";
import { Link, router } from "expo-router";

import { useAuth } from "./context/AuthContext";

function SignupPage() {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const { onSignin } = useAuth();

  async function signin() {
    if (pass1 == pass2) {
      const res = await onSignin(username, email, pass1);
      if (res.error) {
        if(res.msg.message == "validation error") {
          alert(res.msg.data.message);
        } else {
          alert(res.msg.message)
        }
      }
      if (!res.error) {
        alert("You have been successfully registered. Please Log In");
        router.replace("/login");
      }
      return;
    }

    alert("Passwords are not same!");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/deguapp_logo.png")}
          style={styles.logo}
        />
        <Text style={styles.h1}>Please Sign Up</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor={"#aaaaaa"}
          returnKeyType="done"
          value={username}
          onChangeText={(username) => setUsername(username)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholderTextColor={"#aaaaaa"}
          returnKeyType="next"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Enter your password"
          placeholderTextColor={"#aaaaaa"}
          returnKeyType="done"
          value={pass1}
          onChangeText={(pass1) => setPass1(pass1)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Enter your password"
          placeholderTextColor={"#aaaaaa"}
          returnKeyType="done"
          value={pass2}
          onChangeText={(pass2) => setPass2(pass2)}
        />
        <Button
          style={styles.button}
          title="Sign Up"
          color={colors.gold}
          onPress={signin}
        />
        <Link href="/login" style={styles.a}>
          Already have an account? Log In!
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.dark,
  },
  form: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
    width: "100%",
    gap: 15,
  },
  h1: {
    color: "#FFF",
    fontSize: 30,
    textAlign: "center",
    paddingTop: "20%",
  },
  a: {
    color: "#FFF",
    fontSize: 12,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  logo: {
    width: "80%",
    resizeMode: "contain",
  },
  header: {
    width: "100%",
    alignItems: "center",
    paddingTop: "20%",
  },
  input: {
    height: "auto",
    width: "60%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: "#fff",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 5,
  },
});

export default SignupPage;
