import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';

const Feedback = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!message.trim()) {
      Alert.alert('Empty Feedback', 'Please write your feedback before submitting.');
      return;
    }

    // You can connect API here to send feedback to server
    Alert.alert('Thank You!', 'Your feedback has been submitted.');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Feedback</Text>
      </View>

      <Text style={styles.label}>We value your feedback</Text>

      <TextInput
        style={styles.input}
        placeholder="Write your feedback here..."
        placeholderTextColor="#6b21a8"
        multiline
        numberOfLines={6}
        value={message}
        onChangeText={setMessage}
      />

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Feedback</Text>
      </Pressable>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
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
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  label: {
    fontSize: 16,
    color: '#4b0082',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f3e8ff',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#4b0082',
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: 'purple',
    padding: 14,
    borderRadius: 30,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
