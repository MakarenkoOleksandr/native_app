import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Submit from "../btn/Submit";
import SERVER from "../../config";
import { useHook } from "../hooks/Hooks";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Please fill your data");
  const { activeScreen, setActiveScreen, setLoggined, token, setUser } =
    useHook();

  const handleSubmit = async () => {
    const updateParam = "loggined";
    const updateStatus = "true";

    try {
      const response = await fetch(
        `${SERVER}/user/getUserByToken?token=${token}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (data.ok) {
        if (password === data.data.password) {
          setMessage("Login successfully");
          await fetch(
            `${SERVER}/user/update?token=${token}&update=${updateParam}&status=${updateStatus}`,
            { method: "POST", headers: { "Content-Type": "application/json" } }
          );

          setActiveScreen("Dashboard");
          setLoggined(true);
          setUser(email);
        } else setMessage("Password is incorrect");
      }

      if (!data.ok) setMessage("Username not found");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={activeScreen === "SignUp" ? styles.container : styles.none}>
      {message && <Text style={styles.message}>{message}</Text>}
      <View style={styles.form}>
        <View style={styles.wrap}>
          <Text style={styles.label}>Login:</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.wrap}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter your password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <Submit onPress={handleSubmit} data={"Login"} style={styles.submit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    padding: 20,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    color: "rgb(255, 230, 230)",
  },
  form: {
    width: "80%",
    borderWidth: 1,
    borderColor: "rgb(255, 230, 230)",
    borderRadius: 5,
    padding: 20,
  },
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    color: "rgb(255, 230, 230)",
  },
  input: {
    color: "rgb(255, 230, 230)",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: 200,
  },
  submit: {
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "rgb(255, 230, 230)",
    padding: 10,
    borderRadius: 5,
  },
  none: {
    display: "none",
  },
});

export default SignUp;
