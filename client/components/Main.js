import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useHook } from "./hooks/Hooks";

const Main = () => {
  const { activeScreen } = useHook();

  return (
    <View style={activeScreen === "Main" ? styles.container : styles.none}>
      <Text style={styles.header}>Welcome to our crypto service</Text>
      <Text style={styles.content}>
        We are providing to serve you account all in one
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 8,
    color: "rgb(255, 230, 230)",
    textAlign: "center",
  },
  content: {
    fontSize: 30,
    maxWidth: 650,
    textAlign: "center",
    color: "rgb(255, 230, 230)",
  },
  none: {
    display: "none",
  },
});

export default Main;
