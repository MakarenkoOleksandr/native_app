import React, { useState, useEffect, useCallback } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { faSquareCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Submit from "../btn/Submit";
import SERVER from "../../config";
import { useHook } from "../hooks/Hooks";

const Confirmation = ({ btnData }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("Please check your mail");
  const { token, setRegistrationStep, setActiveScreen } = useHook();
  const nav = useNavigation();

  const confirmed = async () => {
    const updateParam = "confirmed";
    const updateStatus = "true";

    try {
      const response = await fetch(
        `${SERVER}/user/update?token=${token}&update=${updateParam}&status=${updateStatus}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.ok) {
        setActiveScreen("SignUp");
        nav.navigate("SignUp");
        setRegistrationStep(1);
      }
    } catch (error) {
      console.error("Error during confirmation:", error);
    }
  };

  const checkConfirmationCode = async () => {
    try {
      const response = await fetch(
        `${SERVER}/user/getUserByToken?token=${token}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data.data.confirmationCode === code) {
        confirmed();
      }
      if (data.data.confirmationCode !== code) {
        setMessage("Wrong code");
      }
    } catch (error) {
      console.error("Error checking confirmation code availability:", error);
    }
  };

  const handleCodeInput = (text) => {
    setCode(text);
  };
  return (
    <View style={styles.container}>
      {message && <Text style={styles.message}>{message}</Text>}
      <View style={styles.form}>
        <Text style={styles.label}>Confirmation Code:</Text>
        <View style={styles.wrap}>
          <TextInput
            style={styles.input}
            placeholder="Enter Confirmation Code"
            value={code}
            onChangeText={handleCodeInput}
          />
        </View>
        <Submit
          style={styles.submit}
          data={btnData}
          onPress={checkConfirmationCode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    padding: 20,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    color: "rgb(255, 230, 230)",
  },
  form: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgb(255, 230, 230)",
    borderRadius: 5,
    padding: 20,
  },
  label: {
    marginBottom: 5,
    color: "rgb(255, 230, 230)",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "rgb(255, 230, 230)",
    marginBottom: 20,
  },
  submit: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
  },
  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Confirmation;
