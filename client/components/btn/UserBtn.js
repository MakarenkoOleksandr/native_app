import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const UserBtn = ({ btnData, click, style }) => {
  return (
    <TouchableOpacity style={style} onPress={() => click("loggined", "false")}>
      <Text>{btnData}</Text>
    </TouchableOpacity>
  );
};

export default UserBtn;
