import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import SERVER from "../../config";
import { useHook } from "../hooks/Hooks";
import Submit from "../btn/Submit";

const AddNetwork = () => {
  const [name, setName] = useState("");
  const [tokens, setTokens] = useState("");
  const [rpc, setRpc] = useState("");
  const [message, setMessage] = useState("Fill out fields");
  const { activeDBM, setActiveDBM, token } = useHook();

  const addNetwork = async () => {
    try {
      const response = await fetch(`${SERVER}/user/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          param: "network",
          value: {
            name: name,
            token: tokens,
            rpc: rpc,
          },
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setActiveDBM("/");
        setMessage(data.data);
        setName("");
        setTokens("");
        setRpc("");
      } else {
        setMessage(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const close = () => {
    setActiveDBM("/");
    setName("");
    setTokens("");
    setRpc("");
  };

  return (
    <View style={activeDBM === "/AddNetwork" ? styles.container : styles.none}>
      {message && <Text style={styles.message}>{message}</Text>}
      <View style={styles.form}>
        <View style={styles.wrap}>
          <Text style={styles.name}>Network:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter network name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.wrap}>
          <Text style={styles.name}>Token:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter token name"
            value={tokens}
            onChangeText={(text) => setTokens(text)}
          />
        </View>
        <View style={styles.wrap}>
          <Text style={styles.name}>RPC:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter rpc HTTP"
            value={rpc}
            onChangeText={(text) => setRpc(text)}
          />
        </View>
        <View style={styles.wrapBtn}>
          <Submit
            data={"Submit"}
            onPress={addNetwork}
            style={
              name && tokens && rpc ? styles.submit : styles.submitDisabled
            }
            disabled={!name && !tokens && !rpc}
          />
          <Submit data={"Close"} onPress={close} style={styles.submit} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    borderWidth: 1,
    borderColor: "rgb(255, 230, 230)",
    borderRadius: 5,
    padding: 20,
  },
  message: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
    paddingBottom: 20,
  },
  submit: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: "rgb(255, 230, 230)",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitDisabled: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    opacity: 0.2,
    alignItems: "center",
  },
  wrap: {
    flexDirection: "row",
    gap: 20,
    paddingBottom: 20,
  },
  wrapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  name: {
    flex: 1,
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "rgb(255, 230, 230)",
  },
  none: {
    display: "none",
  },
});

export default AddNetwork;
