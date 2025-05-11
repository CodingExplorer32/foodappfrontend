import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          backgroundColor: "purple",
          paddingVertical: 20,
          marginBottom: 20,
          borderEndEndRadius: 12,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 4,
        }}
      >
        <Text style={styles.title}>Privacy Policy — FoodApp</Text>
      </View>

      <Text style={styles.paragraph}>
        Welcome to FoodApp, where great food meets great care. We value your
        privacy as much as you value a perfect meal!
      </Text>

      <Text style={styles.sectionTitle}>📌 What we collect:</Text>
      <Text style={styles.listItem}>
        • Personal info (name, email, delivery address)
      </Text>
      <Text style={styles.listItem}>• Order history and preferences</Text>
      <Text style={styles.listItem}>
        • Device info (to improve app performance)
      </Text>

      <Text style={styles.sectionTitle}>🛡️ How we protect your data:</Text>
      <Text style={styles.listItem}>• End-to-end encrypted transactions</Text>
      <Text style={styles.listItem}>
        • We never sell your data — not even for the best deal!
      </Text>

      <Text style={styles.sectionTitle}>🍽️ Why we use your info:</Text>
      <Text style={styles.listItem}>
        • To deliver your favorite meals faster
      </Text>
      <Text style={styles.listItem}>
        • To suggest delicious recommendations
      </Text>
      <Text style={styles.listItem}>
        • To make our app smoother and smarter
      </Text>

      <Text style={styles.paragraph}>
        By using FoodApp, you're agreeing to our purple promise: Your data stays
        safe & your food stays delicious.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    color: "white", // Deep purple
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#8E44AD", // Lighter purple
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
    lineHeight: 22,
  },
  listItem: {
    fontSize: 16,
    color: "#555",
    marginLeft: 12,
    marginBottom: 6,
  },
});

export default PrivacyPolicyScreen;
