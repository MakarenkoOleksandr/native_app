import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import UserBtn from "../btn/UserBtn";
import AddWalletBtn from "../btn/AddWalletBtn";
import AddNetworkBtn from "../btn/AddNetworkBtn";
import SERVER from "../../config";
import { useHook } from "../hooks/Hooks";

const Profile = () => {
  const [btnData, setBtnData] = useState("Add");
  const [isWallet, setIsWallet] = useState(false);
  const [network, setNetwork] = useState([]);
  const {
    setLoggined,
    token,
    setActiveScreen,
    user,
    activeDBM,
    setActiveDBM,
    wallet,
    setWallet,
  } = useHook();

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
        setNetwork(data.data.network.map((network) => network.name));
      }
      if (data.data.metamask) {
        setIsWallet(true);
        setWallet(data.data.metamask);
        setBtnData("Change");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeDBM]);

  const handleWalletChange = async (updateParam, updateStatus, data) => {
    if (data === "Change") {
      setWallet("");
      setIsWallet(false);
      setBtnData("Add");
    } else {
      try {
        const response = await fetch(
          `${SERVER}/user/update?token=${token}&update=${updateParam}&status=${updateStatus}`,
          { method: "POST" }
        );

        const data = await response.json();
        if (data.ok) {
          setIsWallet(true);
          setBtnData("Change");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogout = async (updateParam, updateStatus) => {
    try {
      const response = await fetch(
        `${SERVER}/user/update?token=${token}&update=${updateParam}&status=${updateStatus}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );

      const data = await response.json();

      if (data.ok) {
        setActiveScreen("Main");
        setLoggined(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNetworkAdd = () => {
    setActiveDBM("/AddNetwork");
  };

  return (
    <View style={activeDBM === "/" ? styles.container : styles.none}>
      <View style={styles.wrap}>
        <Text style={styles.name}>User:</Text>
        <Text style={styles.content}>{user}</Text>
        <UserBtn
          btnData={"Logout"}
          click={handleLogout}
          style={styles.action}
        />
      </View>
      <View style={styles.wrap}>
        {isWallet === false ? (
          <>
            <Text style={styles.name}>Wallet:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your wallet"
              onChangeText={(text) => setWallet(text)}
            />
          </>
        ) : (
          <>
            <Text style={styles.name}>Wallet: </Text>
            <Text style={styles.contentWallet} numberOfLines={1}>
              {wallet}
            </Text>
          </>
        )}
        <AddWalletBtn
          btnData={btnData}
          handleWalletChange={handleWalletChange}
          wallet={wallet}
          style={styles.action}
        />
      </View>
      <View style={styles.wrapLast}>
        <Text style={styles.name}>Networks:</Text>
        <View>
          {network ? (
            network.map((el, index) => (
              <Text style={styles.contentNetworks} key={index}>
                - {el} -
              </Text>
            ))
          ) : (
            <Text style={styles.contentNetworks}>No networks</Text>
          )}
        </View>

        <AddNetworkBtn
          btnData={"Add"}
          style={styles.action}
          handleNetworkAdd={handleNetworkAdd}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "rgb(255, 230, 230)",
    borderRadius: 5,
    padding: 15,
  },
  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 30,
    paddingBottom: 30,
  },
  wrapLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 30,
  },
  name: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  content: {
    color: "white",
  },
  contentWallet: {
    color: "white",
    width: 130,
  },
  contentNetworks: {
    flexDirection: "column",
    color: "white",
  },
  input: {
    width: "40%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "rgb(255, 230, 230)",
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

export default Profile;
