import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useHook } from "../hooks/Hooks";

const MainMenu = () => {
  const nav = useNavigation();
  const { setActiveScreen, loggined, setActiveDBM } = useHook();

  const handleNavigate = (screenName) => {
    nav.navigate(screenName);
    setActiveScreen(screenName);
    if (screenName === "Dashboard") {
      setActiveDBM("/");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        {!loggined ? (
          <>
            <TouchableOpacity
              style={styles.menuLink}
              onPress={() => handleNavigate("SignIn")}
            >
              <Text>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuLink}
              onPress={() => handleNavigate("SignUp")}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.menuLink}
            onPress={() => handleNavigate("Dashboard")}
          >
            <Text>Dashboard</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 40,
  },
  menuLink: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "rgb(255, 230, 230)",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "Black",
    fontWeight: "600",
    color: "black",
  },
});

export default MainMenu;
