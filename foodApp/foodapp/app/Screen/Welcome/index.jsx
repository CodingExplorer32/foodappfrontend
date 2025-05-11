import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import AuthContext from "../../context/AuthProvider";
import ButtonWork from "../../components/button";

const Index = () => {
  const router = useRouter();
  const { user } = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = () => {
    setIsLoading(true);
    router.push("/(tabs)/"); // Navigate to home page
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.maintitle}>HamroKhana</Text>
      <Text>{user ? `Welcome, ${user}` : "Please log in"}</Text>
      {user == null ? (
        <View style={styles.container}>
          <ButtonWork />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button1}
          onPress={handleNavigation}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Go To Home Page</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
  },
  maintitle: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    color:"white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button1: {
    marginTop: 100,
    paddingVertical: 15,
    paddingHorizontal: 50,
    backgroundColor: "red",
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
