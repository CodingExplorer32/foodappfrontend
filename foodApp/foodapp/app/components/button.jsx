import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const ButtonWork = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => router.push("/Screen/singin/")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => router.push("/Screen/singup/")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonWork;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FEF3E2",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  maintitle: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  button1: {
    marginTop: 100,
    paddingVertical: 15,
    paddingHorizontal: 50,
    backgroundColor: "red",
    borderRadius: 15,
    marginBottom: 15,
  },
  button2: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    backgroundColor: "blue",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
