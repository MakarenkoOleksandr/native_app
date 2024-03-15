import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { faSquareCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import SERVER from "../../config";

const Password = ({
  password,
  setPassword,
  availablePassword,
  setAvailablePassword,
  isAvailableUsername,
  setMessage,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isInputComplete, setIsInputComplete] = useState(false);

  const checkPasswordAvailability = useCallback(
    async (password, confirmPassword) => {
      try {
        const response = await fetch(`${SERVER}/user/checkPass`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, confirmPassword }),
        });

        const data = await response.json();

        setAvailablePassword(data.ok);
        isAvailableUsername === true
          ? setMessage(data.data)
          : setMessage("Username already exists");
      } catch (error) {
        console.error("Error checking password availability:", error);
      }
    },
    [setMessage, setAvailablePassword, isAvailableUsername]
  );

  const handleChangePass = (text) => {
    setPassword(text);
  };

  const handleChangeConfirmPass = (text) => {
    setConfirmPassword(text);
  };

  useEffect(() => {
    if (password && confirmPassword) {
      setIsInputComplete(true);
      checkPasswordAvailability(password, confirmPassword);
    } else {
      setIsInputComplete(false);
    }
  }, [password, confirmPassword, checkPasswordAvailability]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={handleChangePass}
        />
        {isInputComplete && (
          <FontAwesomeIcon
            style={[
              styles.checked,
              { display: availablePassword === true ? "flex" : "none" },
            ]}
            icon={faSquareCheck}
          />
        )}
        <FontAwesomeIcon
          style={[
            styles.checked,
            { display: availablePassword === false ? "flex" : "none" },
          ]}
          icon={faTimes}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={handleChangeConfirmPass}
        />
        {isInputComplete && (
          <FontAwesomeIcon
            style={[
              styles.checked,
              { display: availablePassword === true ? "flex" : "none" },
            ]}
            icon={faSquareCheck}
          />
        )}
        <FontAwesomeIcon
          style={[
            styles.checked,
            { display: availablePassword === false ? "flex" : "none" },
          ]}
          icon={faTimes}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  checked: {
    marginLeft: 5,
    fontSize: 20,
    color: "#00f0c0",
  },
});

export default Password;
