import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const ContactUs = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:support@hireeer.com'); 
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+9779841234567'); 
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Contact Us</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="mail" size={30} color="#7c3aed" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Email</Text>
          <Pressable onPress={handleEmailPress}>
            <Text style={styles.value}>support@hamrokhana.com</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.card}>
        <Ionicons name="call" size={30} color="green" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Phone</Text>
          <Pressable onPress={handlePhonePress}>
            <Text style={styles.value}>+977 9841234567</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ContactUs;

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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e8ff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#6b21a8',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b0082',
  },
});
