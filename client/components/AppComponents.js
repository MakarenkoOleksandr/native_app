import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ImageBackground, StyleSheet } from "react-native";
import { useHook } from "./hooks/Hooks";
import MainMenu from "./menu/MainMenu";
import Signin from "./signin/SignIn";
import SignUp from "./signup/SignUp";
import Main from "./Main";
import Dashboard from "./dashboard/Dashboard";
import SERVER from "../config";
import bg from "../img/bg.jpg";
import AddNetwork from "./dashboard/AddNetwork";

const Stack = createNativeStackNavigator();

const AppComponent = () => {
  const {
    setActiveScreen,
    loggined,
    setLoggined,
    setUser,
    token,
    setToken,
    setRegistrationStep,
  } = useHook();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };

  const checkToken = async () => {
    try {
      const user = await AsyncStorage.getItem("AuthToken");
      setToken(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch(
          `${SERVER}/user/getUserByToken?token=${token}`,
          { method: "GET" }
        );
        const data = await response.json();

        if (data.ok) {
          setUser(data.data.email);
          if (data.data.loggined) {
            setLoggined(data.data.loggined);
            setActiveScreen("Dashboard");
          }
          if (data.data.confirmed === false) {
            setRegistrationStep(2);
          }
        } else {
          setActiveScreen("Main");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkUser();
  }, [token]);

  useEffect(() => {
    checkToken();
  }, [token]);

  return (
    <ImageBackground source={bg} style={styles.background}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={styles.header}>
          {loggined === false ? (
            <>
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="SignIn" component={Signin} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          ) : (
            <>
              <Stack.Screen name="Dashboard" component={Dashboard} />
            </>
          )}
          <Stack.Screen name="AddNetwork" component={AddNetwork} />
        </Stack.Navigator>
        <MainMenu />
      </NavigationContainer>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    headerShown: false,
  },
});

export default AppComponent;
