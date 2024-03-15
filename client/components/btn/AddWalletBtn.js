import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AddWalletBtn = ({ btnData, handleWalletChange, wallet, style }) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={() => handleWalletChange("metamask", wallet, btnData)}
    >
      <Text>{btnData}</Text>
    </TouchableOpacity>
  );
};

export default AddWalletBtn;
