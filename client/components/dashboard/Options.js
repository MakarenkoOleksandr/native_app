import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useHook } from "../hooks/Hooks";
import SERVER from "../../config";
import Submit from "../btn/Submit";

const Options = () => {
  const [balance, setBalance] = useState(null);
  const [net, setNet] = useState([]);
  const [message, setMessage] = useState(
    "Here will be shown your current balance"
  );
  const { token, activeDBM, wallet } = useHook();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${SERVER}/user/getUserByToken?token=${token}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        if (data.ok) {
          setNet(data.data.network);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [activeDBM, setNet]);

  const handleCheck = async (network) => {
    try {
      const response = await fetch(
        `${SERVER}/user/checkBalance?network=${network.rpc}&wallet=${wallet}`
      );

      const data = await response.json();
      if (data.ok) {
        setMessage(
          `For ${network.name} network balance is ${data.data} ${network.token}`
        );
      } else {
        setMessage(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={activeDBM === "/options" ? styles.container : styles.none}>
      <View>{message && <Text style={styles.message}>{message}</Text>}</View>
      <View style={styles.wrap}>
        {net.map((el, idx) => (
          <View style={styles.item} key={idx}>
            <Text style={styles.name}>Network:</Text>
            <Text style={styles.content}>{el.name}</Text>
            <Text style={styles.name}>Token:</Text>
            <Text style={styles.content}>{el.token}</Text>
            <Submit
              data={"Check"}
              onPress={() => handleCheck(el)}
              style={styles.action}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  message: {
    paddingBottom: 20,
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  wrap: {
    justifyContent: "center",
    marginBottom: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
  content: {
    color: "white",
    fontSize: 12,
    fontStyle: "italic",
  },
  item: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  action: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
    width: 90,
  },
  none: {
    display: "none",
  },
});

export default Options;
