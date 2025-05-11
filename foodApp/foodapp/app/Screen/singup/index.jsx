import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import AuthContext  from "../../context/AuthProvider";
import Toast from "react-native-toast-message";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = React.useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const HandleRegister = () => {
    register(username, email, password);
    Toast.show({
      type: "success",
      text1: "Registration Successful",
      text2: "You are now registered",
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Username</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          keyboardType="default"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            style={styles.inputPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Pressable style={styles.button} onPress={HandleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/Screen/singin/")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 60,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 9,
    fontWeight: "600",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 18,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    fontSize: 16,
    width: "100%",
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#007AFF",
    marginTop: 18,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
