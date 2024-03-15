import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useHook } from "../hooks/Hooks";

const DashboardMenu = ({ handleClick }) => {
  const { activeDBM } = useHook();
  return (
    <View style={styles.menuActions}>
      <TouchableOpacity
        style={[
          styles.menuAction,
          activeDBM === "/" ? styles.activeMenu : null,
        ]}
        onPress={() => handleClick("/")}
      >
        <Text
          style={[
            styles.menuLink,
            activeDBM === "/" ? styles.activeLink : null,
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuAction,
          activeDBM === "/options" ? styles.activeMenu : null,
        ]}
        onPress={() => handleClick("/options")}
      >
        <Text
          style={[
            styles.menuLink,
            activeDBM === "/options" ? styles.activeLink : null,
          ]}
        >
          Options
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
  menuAction: {
    backgroundColor: "rgb(255, 230, 230)",
    padding: 20,
    borderRadius: 15,
  },
  activeMenu: {
    backgroundColor: "black",
    color: "rgb(255, 230, 230)",
    borderWidth: 2,
    borderColor: "rgb(255, 230, 230)",
  },
  menuLink: {
    color: "black",
  },
  activeLink: {
    color: "rgb(255, 230, 230)",
  },
});

export default DashboardMenu;
