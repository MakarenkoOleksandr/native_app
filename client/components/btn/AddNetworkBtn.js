import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AddNetworkBtn = ({ btnData, style, handleNetworkAdd }) => {
  return (
    <TouchableOpacity style={style} onPress={() => handleNetworkAdd()}>
      <Text>{btnData}</Text>
    </TouchableOpacity>
  );
};

export default AddNetworkBtn;
