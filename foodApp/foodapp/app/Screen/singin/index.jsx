import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import  AuthContext  from "../../context/AuthProvider";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";

const Signin = () => {
  const router = useRouter();
  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        alert("You need to enable permissions in settings");
      }
    };
    requestPermission();
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Welcome to the app",
        body: "You are now logged in",
        sound: true,
      },
      trigger: null,
    });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter both email and password.",
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      sendNotification();
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "You are now logged in",
      });
    } catch (error) {
      sendNotification();
      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: `${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign In</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          accessible={true}
          accessibilityLabel="Email Input"
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
            accessible={true}
            accessibilityLabel="Password Input"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            accessible={true}
            accessibilityLabel={
              showPassword ? "Hide Password" : "Show Password"
            }
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Pressable
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </Pressable>

      <Pressable onPress={() => router.push("/Screen/singup/")}>
        <Text style={styles.linkText}>Create an account</Text>
      </Pressable>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingTop: 100,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 32,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
    fontWeight: "600",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
  },
  input: {
    borderWidth: 1,
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
    marginTop: 16,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
