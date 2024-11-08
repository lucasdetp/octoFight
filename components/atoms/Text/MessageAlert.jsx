import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const MessageAlert = ({ message, type = 'error' }) => {
    if (!message) return null;

    const containerStyle = [
        styles.messageContainer,
        type === 'success' ? styles.successBackground : styles.errorBackground
    ];

    const textStyle = [
        styles.messageText,
        type === 'success' ? styles.successText : styles.errorText
    ];

    return (
        <View style={containerStyle}>
            <Text style={textStyle}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        marginVertical: 10,
        padding: 15,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    successBackground: {
        backgroundColor: '#d4edda', 
    },
    errorBackground: {
        backgroundColor: '#f8d7da', 
    },
    messageText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    successText: {
        color: '#155724', 
    },
    errorText: {
        color: '#721c24', 
    },
});

export default MessageAlert;
