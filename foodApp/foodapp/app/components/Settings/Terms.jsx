import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

const Terms = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Terms & Conditions</Text>
      </View>

      <Text style={styles.title}>1. Acceptance of Terms</Text>
      <Text style={styles.text}>
        By accessing or using our app, you agree to be bound by these terms and conditions. If you do not agree, please do not use the app.
      </Text>

      <Text style={styles.title}>2. User Responsibilities</Text>
      <Text style={styles.text}>
        You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      </Text>

      <Text style={styles.title}>3. Modifications to the Service</Text>
      <Text style={styles.text}>
        We reserve the right to modify or discontinue the service (or any part thereof) at any time, with or without notice.
      </Text>

      <Text style={styles.title}>4. Intellectual Property</Text>
      <Text style={styles.text}>
        All content, trademarks, and data on this app, including but not limited to software, databases, text, graphics, icons, and hyperlinks are the property of or licensed to us.
      </Text>

      <Text style={styles.title}>5. Limitation of Liability</Text>
      <Text style={styles.text}>
        We are not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the app.
      </Text>

      <Text style={styles.title}>6. Governing Law</Text>
      <Text style={styles.text}>
        These terms shall be governed by and construed in accordance with the laws of your jurisdiction.
      </Text>
    </ScrollView>
  );
};

export default Terms;

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
