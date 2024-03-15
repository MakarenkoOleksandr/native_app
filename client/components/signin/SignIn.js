import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Mail from "./Mail";
import Password from "./Password";
import Submit from "../btn/Submit";
import Confirmation from "./Confirmation";
import SERVER from "../../config";
import { useHook } from "../hooks/Hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Please fill form below");
  const [btnData, setBtnData] = useState("Register");
  const [isAvailableUsername, setAvailableUsername] = useState(null);
  const [availablePassword, setAvailablePassword] = useState(null);

  const { activeScreen, setToken, registrationStep, setRegistrationStep } =
    useHook();

  const setLocalStorage = async () => {
    try {
      const response = await fetch(`${SERVER}/user/getUser?email=${email}`, {
        method: "GET",
      });

      const data = await response.json();
      if (data.ok) {
        await AsyncStorage.setItem("AuthToken", data.data.token);
        setToken(data.data.token);
      }
    } catch (error) {
      console.error("Error during confirmation:", error);
    }
  };

  const sendConfirmationCode = async () => {
    try {
      await fetch(`${SERVER}/user/confirmUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      setLocalStorage();
    } catch (error) {
      console.error("Error sending confirmation code:", error);
    }
  };

  const register = async () => {
    try {
      const response = await fetch(`${SERVER}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setRegistrationStep(2);
        setBtnData("Confirm");
        sendConfirmationCode();
        setMessage("We have sent a confirmation code to your email");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Error during registration. Please try again.");
    }
  };

  return (
    <View style={activeScreen === "SignIn" ? styles.container : styles.none}>
      {registrationStep === 1 && (
        <View style={styles.form}>
          {message && <Text style={styles.message}>{message}</Text>}
          <Mail
            email={email}
            setEmail={setEmail}
            isAvailableUsername={isAvailableUsername}
            setAvailableUsername={setAvailableUsername}
            setMessage={setMessage}
          />
          <Password
            password={password}
            setPassword={setPassword}
            availablePassword={availablePassword}
            setAvailablePassword={setAvailablePassword}
            isAvailableUsername={isAvailableUsername}
            setMessage={setMessage}
          />
          <Submit
            style={
              isAvailableUsername !== true || availablePassword !== true
                ? styles.submitDisabled
                : styles.submit
            }
            data={btnData}
            onPress={register}
            disabled={
              isAvailableUsername !== true || availablePassword !== true
            }
          />
        </View>
      )}

      {registrationStep === 2 && (
        <Confirmation
          email={email}
          message={message}
          btnData={btnData}
          setRegistrationStep={setRegistrationStep}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "80%",
    borderWidth: 1,
    borderColor: "rgb(255, 230, 230)",
    borderRadius: 5,
    padding: 20,
  },
  submit: {
    marginVertical: 10,
    backgroundColor: "rgb(255, 230, 230)",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitDisabled: {
    marginVertical: 10,
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    opacity: 0.2,
    alignItems: "center",
  },
  message: {
    color: "rgb(255, 230, 230)",
    padding: 20,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  none: {
    display: "none",
  },
});

export default Signin;
