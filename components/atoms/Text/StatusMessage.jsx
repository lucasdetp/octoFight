import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusMessage = ({ message, type }) => (
  <View style={[styles.container, type === 'error' ? styles.error : styles.success]}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  success: {
    backgroundColor: '#d4edda',
  },
  error: {
    backgroundColor: '#f8d7da',
  },
  message: {
    fontSize: 16,
    color: '#721c24',
  },
});

export default StatusMessage;
