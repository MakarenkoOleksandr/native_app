import React, { useState, useEffect, useCallback } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { faSquareCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import SERVER from "../../config";

const Mail = ({
  email,
  setEmail,
  setMessage,
  isAvailableUsername,
  setAvailableUsername,
}) => {
  const [isInputComplete, setIsInputComplete] = useState(false);

  const checkUsernameAvailability = useCallback(
    async (email) => {
      try {
        const response = await fetch(`${SERVER}/user/checkEmail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        setAvailableUsername(data.ok);
        setMessage(data.data);
      } catch (error) {
        console.error("Error checking username availability:", error);
      }
    },
    [setMessage, setAvailableUsername]
  );

  const handleEmailChange = useCallback(
    (text) => {
      setEmail(text);
    },
    [setEmail]
  );

  useEffect(() => {
    const fullyTyped = email && email.endsWith(".com");
    const fetchData = async () => {
      await checkUsernameAvailability(email);
    };

    if (fullyTyped) {
      setIsInputComplete(true);
      fetchData();
    }
  }, [email, checkUsernameAvailability]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mail:</Text>
      <TextInput
        style={[
          styles.input,
          isInputComplete === true
            ? isAvailableUsername === false
              ? styles.unavailable
              : styles.available
            : {},
        ]}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
      />
      <FontAwesomeIcon
        icon={faSquareCheck}
        style={[
          styles.checked,
          { display: isAvailableUsername === true ? "flex" : "none" },
        ]}
      />
      <FontAwesomeIcon
        icon={faTimes}
        style={[
          styles.checked,
          { display: isAvailableUsername === false ? "flex" : "none" },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  label: {
    marginRight: 10,
    color: "rgb(255, 230, 230)",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "rgb(255, 230, 230)",
  },
  available: {
    borderColor: "#00f0c0",
  },
  unavailable: {
    borderColor: "#b71515",
  },
  checked: {
    marginLeft: 5,
    fontSize: 20,
    color: "#00f0c0",
  },
});

export default Mail;
