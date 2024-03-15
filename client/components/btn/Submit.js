import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Submit = ({ data, onPress, disabled, style }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{data}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Submit;
