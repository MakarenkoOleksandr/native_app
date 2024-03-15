import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DashboardMenu from "../menu/DashboardMenu";
import Profile from "../dashboard/Profile";
import Options from "../dashboard/Options";
import { useHook } from "../hooks/Hooks";
import AddNetwork from "./AddNetwork";

const Dashboard = () => {
  const { activeScreen, setActiveDBM } = useHook();

  const handleClick = (link) => {
    setActiveDBM(link);
  };

  return (
    <View style={activeScreen === "Dashboard" ? styles.container : styles.none}>
      <View style={styles.menu}>
        <DashboardMenu handleClick={handleClick} />
      </View>
      <View style={styles.content}>
        <Profile />
        <Options />
        <AddNetwork />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  menu: {
    position: "absolute",
    width: "100%",
    top: 50,
  },
  content: {
    padding: 20,
  },
  none: {
    display: "none",
  },
});

export default Dashboard;
