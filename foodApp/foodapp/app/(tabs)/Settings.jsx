import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";


const Settings = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);

  // Pick image function
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "We need permission to access your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Let user crop
      aspect: [1, 1], // Square
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={pickImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("@/assets/images/splash-icon.png")
            }
            style={styles.headerImage}
          />
        </Pressable>
        {/* <Text style={styles.headerText}>Welcome, {email || "User"}</Text> */}
        <Text style={styles.editText}>Tap to change photo</Text>
      </View>

      {/* Main Content */}
      <ScrollView>
        <View style={styles.items}>
          {/* Account Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Account</Text>
          </View>
          <View style={styles.item}>
            <Ionicons
              name="person-outline"
              size={24}
              color="#4CAF50"
              style={styles.icon}
            />
            <Pressable onPress={() => router.push("/components/Settings/EditProfile")}>
              <Text style={styles.itemText}>Edit Profile</Text>
            </Pressable>
          </View>
          <View style={styles.item}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="#FF5722"
              style={styles.icon}
            />
            <Pressable onPress={() => router.push("/components/Settings/UpdatePassword")}>
              <Text style={styles.itemText}>Update Password</Text>
            </Pressable>
          </View>

          {/* Customer Care Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Customer Care</Text>
          </View>
          <View style={styles.item}>
            <Ionicons
              name="call-outline"
              size={24}
              color="#2196F3"
              style={styles.icon}
            />
            <Pressable onPress={() => router.push("/components/Settings/ContactUs")}>
              <Text style={styles.itemText}>Contact Us</Text>
            </Pressable>
          </View>
          <View style={styles.item}>
            <Ionicons
              name="chatbubbles-outline"
              size={24}
              color="#9C27B0"
              style={styles.icon}
            />
            <Pressable onPress={() => router.push("/components/Settings/Feedback")}>
              <Text style={styles.itemText}>Feedback</Text>
            </Pressable>
          </View>

          {/* Legal Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Legal</Text>
          </View>
          <View style={styles.item}>
            <Ionicons
              name="document-text-outline"
              size={24}
              color="#FFC107"
              style={styles.icon}
            />
            <Pressable onPress={() => router.push("/components/Settings/Terms")}>
              <Text style={styles.itemText}>Terms and Conditions</Text>
            </Pressable>
          </View>
          <View style={styles.item}>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color="#009688"
              style={styles.icon}
            />
            <Pressable onPress={() => router.push("/components/Settings/Policies")}>
              <Text style={styles.itemText}>Policies</Text>
            </Pressable>
          </View>

          {/* Logout */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Other</Text>
          </View>
          <View style={styles.item}>
            <Ionicons
              name="log-out-outline"
              size={24}
              color="#E91E63"
              style={styles.icon}
            />
            <Pressable onPress={()=>router.push("/(tabs)")}>
              <Text style={styles.itemText}>Logout</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "purple",
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  editText: {
    color: "#fff",
    marginTop: 8,
    fontSize: 14,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  items: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionHeader: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  icon: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});
