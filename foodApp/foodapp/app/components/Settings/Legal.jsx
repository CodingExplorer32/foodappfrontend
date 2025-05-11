import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

const Legal = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Legal Information</Text>
      </View>

      <Text style={styles.title}>Terms & Conditions</Text>
      <Text style={styles.text}>
        By using our app, you agree to abide by our terms and conditions. We reserve the right to modify or terminate the service for any reason without notice at any time. You are responsible for all activity that occurs under your account.
      </Text>

      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.text}>
        We value your privacy. Your personal information is collected to provide and improve our services. We do not sell or share your data with third parties without your consent. By using the app, you agree to the collection and use of information in accordance with this policy.
      </Text>

      <Text style={styles.title}>Disclaimer</Text>
      <Text style={styles.text}>
        Our app is provided "as is" without any warranties. We do not guarantee the accuracy or reliability of any information or content provided. Use the service at your own risk.
      </Text>
    </ScrollView>
  );
};

export default Legal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'purple',
    paddingVertical: 14,
    borderEndEndRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4b0082',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#5b21b6',
    lineHeight: 22,
  },
});
