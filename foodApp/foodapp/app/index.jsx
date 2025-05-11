import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
const index = () => {
  const router = useRouter();
  const { user, loading } = useAuth();


export default function Index() {
  const { loading, email, username } = React.useContext(AuthContext);

  // Notification setup
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          }),
        });

        const { status } = await Notifications.getPermissionsAsync();
        await AsyncStorage.setItem("notificationPermission", status);
        
        if (status !== "granted") {
          console.log("Notification permission not granted");
        }
      } catch (error) {
        console.error("Notification error:", error);
      }
    };

    setupNotifications();
  }, []);
  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/(tabs)/");
      } else {
        router.push("/Screen/Welcome");
      }
    }
  }, [user, loading]);
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};


export default index;